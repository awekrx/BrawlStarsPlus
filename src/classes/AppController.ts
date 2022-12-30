import { Response, Request } from "express";
import BrawlStarsPlus from "./BrawlStarsPlus";
import Data from "./Data";
import Rules from "./Rules";

interface IBestBrawler {
    [key: string]: number;
}

export default class AppController {
    private path: string;
    private BSP: BrawlStarsPlus;
    public api = {
        results: this.results,
        brawlers: this.brawlers,
        maps: this.maps,
        map: this.map,
        analyze: this.analyze,
    };
    constructor(path: string, BSP: BrawlStarsPlus) {
        this.BSP = BSP;
        this.path = path;
    }

    private async middleware(res: Response, action: () => void) {
        let count = 0;
        while (count < 5) {
            try {
                await action();
                break;
            } catch {
                count++;
            }
        }
        if (count >= 5) {
            res.status(501).send();
        }
    }

    public async main(req: Request, res: Response) {
        res.sendFile(this.path);
    }

    private results(req: Request, res: Response) {
        this.middleware(res, () => {
            res.send(this.BSP.getResults());
        });
    }

    private tags(req: Request, res: Response) {
        this.middleware(res, () => {
            let tags = this.BSP.getTags();
            let data = {
                total: tags.length,
                data: tags,
            };
            res.send(data);
        });
    }

    private matches(req: Request, res: Response) {
        this.middleware(res, () => {
            let matches = this.BSP.getMatches();
            let data = {
                total: matches.length,
                data: matches,
            };
            res.send(data);
        });
    }

    private brawlers(req: Request, res: Response) {
        this.middleware(res, () => {
            res.send(this.BSP.getBrawlers());
        });
    }

    private maps(req: Request, res: Response) {
        this.middleware(res, () => {
            res.send(this.BSP.getMaps());
        });
    }

    private map(req: Request, res: Response) {
        this.middleware(res, () => {
            res.send(this.BSP.getMap(req.params.name));
        });
    }

    private async analyze(req: Request, res: Response) {
        function sortResults(results: IBestBrawler) {
            let sort: [string, number][] = [];
            for (let key in best) {
                sort.push([key, best[key]]);
            }
            sort.sort((a: any, b: any) => b[1] - a[1]);
            return sort;
        }
        function rules(brawler_winrate: number, brawler: string, enemy: string, map: string) {
            for (let rule of Rules.general.vs!) {
                if (rule[0] === brawler && rule[1] === enemy) {
                    brawler_winrate += 10;
                } else if (rule[0] === enemy && rule[1] === brawler) {
                    brawler_winrate -= 10;
                }
            }
            for (let rule of Rules.maps[map].vs) {
                if (rule[0] === brawler && rule[1] === enemy) {
                    brawler_winrate += 10;
                } else if (rule[0] === enemy && rule[1] === brawler) {
                    brawler_winrate -= 10;
                }
            }
            for (let rule of Rules.maps[map].meta) {
                if (typeof rule === "string") {
                    if (brawler === rule) {
                        brawler_winrate += 10;
                    } else if (enemy === rule) {
                        brawler_winrate -= 10;
                    }
                } else {
                    for (let key in rule) {
                        if (Data.brawlers[brawler][key] === rule[key]) {
                            brawler_winrate += 10;
                        } else if (Data.brawlers[enemy][key] === rule[key]) {
                            brawler_winrate -= 10;
                        }
                    }
                }
            }
            return brawler_winrate;
        }
        function vsWinrate(brawler_winrate: number, brawler: string, enemy: string) {
            let vs = map[brawler][enemy];

            if (map[brawler].TOTAL.total / 100 < vs.total) {
                brawler_winrate -= (50 - (vs.win / vs.total) * 100) / 2;
            } else {
                brawler_winrate += 20;
            }
            return brawler_winrate;
        }
        function generalWinrate(map: any, brawler: string) {
            return (map[brawler].TOTAL.win / map[brawler].TOTAL.total) * 100;
        }
        if (!(typeof req.query.map === "string")) {
            res.status(501).send();
            return;
        }
        if (!Data.maps.includes(req.query.map)) {
            res.status(501).send();
            return;
        }
        let query_allies: string[] = (<string>req.query.allies).split(",");
        !query_allies[0] ? (query_allies = []) : null;
        let query_enemies: string[] = (<string>req.query.enemies).split(",");
        !query_enemies[0] ? (query_enemies = []) : null;
        for (let i = 0; i < query_enemies.length; i++) {
            if (!Data.brawlers_names.includes(query_enemies[i])) {
                res.status(501).send();
                return;
            }
        }
        for (let i = 0; i < query_allies.length; i++) {
            if (!Data.brawlers_names.includes(query_allies[i])) {
                res.status(501).send();
                return;
            }
        }
        let map = this.BSP.getMap(req.query.map);
        let total = map.TOTAL;
        let best: IBestBrawler = {};
        for (let brawler in map) {
            if (brawler !== "TOTAL") {
                if (!query_allies.includes(brawler) && !query_enemies.includes(brawler)) {
                    if (map[brawler].TOTAL.total > total / 10) {
                        let brawler_winrate = generalWinrate(map, brawler);
                        for (let enemy of query_enemies) {
                            brawler_winrate = vsWinrate(brawler_winrate, brawler, enemy);
                            // brawler_winrate = rules(brawler_winrate, brawler, enemy, req.query.map);
                        }
                        best[brawler] = +brawler_winrate.toFixed(2);
                    }
                }
            }
        }

        res.send(sortResults(best));
    }
}
