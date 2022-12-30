import BrawlStars, { Battle, BattleLog, Client } from "brawlstars-api-nodejs";

import Data from "./Data";

import DataBase from "./DataBase";

interface IResults {
    [key: string]: any;
}

export default class BrawlStarsPlus {
    private instance!: this;
    private db!: DataBase;
    private client!: Client;
    private tags: string[] = [];
    private matches: string[] = [];
    private results: IResults = {};
    private new_matches: string[] = [];
    private new_tags: string[] = [];
    private index: number = 0;
    private index_stuck_count: number = 0;
    private brawlers: string[] = Data.brawlers_names;
    private maps: string[] = Data.maps;
    private interval: any = null;

    constructor(token: string, db_url: string) {
        if (this.instance) {
            return this.instance;
        }
        this.instance = this;
        this.db = new DataBase(db_url);
        this.client = new BrawlStars.client(token);
    }

    public async start() {
        this.results = await this.db.getAllMaps();
        for (let map in this.results) {
            if (!Object.keys(this.results[map]).length) {
                this.results[map] = await this.initBrawlers();
                await this.db.saveMap(map, this.results[map]);
            }
        }

        return this;
    }

    public getTags(): string[] {
        return this.tags;
    }
    public getMatches(): string[] {
        return this.matches;
    }
    public getResults(): any {
        return this.results;
    }
    public getMap(name: string): any {
        if (this.maps.includes(name)) {
            return this.results[name];
        } else {
            return { map: "Unknown" };
        }
    }
    public getMaps(): string[] {
        return this.maps;
    }
    public getBrawlers(): string[] {
        return this.brawlers;
    }

    public async parse(save_tags: boolean = false): Promise<void> {
        if (this.tags.length === 0) {
            console.log("Loading Data");
            this.tags = await this.db.getTags();
        }

        console.log("Start parsing");
        this.interval = setInterval(async () => {
            if (this.index >= this.tags.length) {
                this.index_stuck_count++;
                if (this.index_stuck_count >= 10_000) {
                    this.index = 0;
                    this.index_stuck_count = 0;
                }
                return;
            }
            this.index_stuck_count = 0;
            let tag = this.tags[this.index];
            this.index++;
            this.client
                .battleLog(tag)
                .then(async (player: BattleLog) => {
                    this.sliceInfoFromData(tag, player);
                })
                .catch(async (err: any) => {
                    this.tags.splice(this.tags.indexOf(tag), 1);
                    this.db.deleteTag(this.tags[this.index]);
                });
            if (this.new_matches.length - 50_000 >= 0) {
                clearInterval(this.interval);
                let buffer = this.new_matches;
                this.new_matches = [];
                await this.db.saveAllMatches(buffer);
                if (save_tags) {
                    await this.db.saveAllTags(this.new_tags);
                }
                this.new_tags = [];
                await this.db.updateAllMaps(this.results);
                this.parse(save_tags);
            }
        }, 10);
    }

    private sliceInfoFromData(tag: string, battleLog: BattleLog): void {
        for (let match of battleLog.history) {
            let match_date = new Date(
                match.time.slice(0, 4) +
                    "-" +
                    match.time.slice(4, 6) +
                    "-" +
                    match.time.slice(6, 11) +
                    ":" +
                    match.time.slice(11, 13) +
                    ":" +
                    match.time.slice(13),
            );
            let seven_days_ago = new Date(new Date().setDate(new Date().getDate() - 7));
            if ((seven_days_ago < match_date && match.type === "soloRanked") || match.type === "teamRanked") {
                this.db.getMatch(this.createMatchID(match)).then((id) => {
                    if (!id) {
                        this.saveResult(tag, match);
                        this.addNewTags(match);
                    }
                });
            }
        }
    }

    private createMatchID(match: Battle): string {
        let id = match.time;
        for (let i = 0; i < 2; i++) {
            for (let player of match.teams[i]!) {
                id += player.tag;
            }
        }
        return id;
    }

    private saveResult(tag: string, match: Battle): void {
        let index_winner = -1;
        for (let player of match.teams[0]) {
            if (player.tag === tag) {
                if (match.result === "victory") {
                    index_winner = 0;
                } else if (match.result === "defeat") {
                    index_winner = 1;
                }
                break;
            }
        }
        if (index_winner === -1) {
            if (match.result === "victory") {
                index_winner = 1;
            } else if (match.result === "defeat") {
                index_winner = 0;
            }
        }
        this.results[match.map].TOTAL += 1;
        if (match.result === "draw") {
            for (let player_1 of match.teams[0]!) {
                for (let player_2 of match.teams[1]!) {
                    this.results[match.map][player_1.brawler.name].TOTAL.total += 1;
                    this.results[match.map][player_1.brawler.name].TOTAL.draw += 1;
                    this.results[match.map][player_2.brawler.name].TOTAL.total += 1;
                    this.results[match.map][player_2.brawler.name].TOTAL.draw += 1;
                    this.results[match.map][player_1.brawler.name][player_2.brawler.name].total += 1;
                    this.results[match.map][player_2.brawler.name][player_1.brawler.name].total += 1;
                    this.results[match.map][player_1.brawler.name][player_2.brawler.name].draw += 1;
                    this.results[match.map][player_2.brawler.name][player_1.brawler.name].draw += 1;
                }
            }
        } else {
            for (let winner of match.teams[index_winner]!) {
                this.results[match.map][winner.brawler.name].TOTAL.total += 1;
                this.results[match.map][winner.brawler.name].TOTAL.win += 1;

                for (let loser of match.teams[1 - index_winner]!) {
                    this.results[match.map][winner.brawler.name][loser.brawler.name].total += 1;
                    this.results[match.map][loser.brawler.name][winner.brawler.name].total += 1;
                    this.results[match.map][winner.brawler.name][loser.brawler.name].win += 1;
                    this.results[match.map][loser.brawler.name][winner.brawler.name].lose += 1;
                }
            }
            for (let loser of match.teams[1 - index_winner]!) {
                this.results[match.map][loser.brawler.name].TOTAL.total += 1;
                this.results[match.map][loser.brawler.name].TOTAL.lose += 1;
            }
        }
    }

    private addNewTags(match: Battle): void {
        for (let i = 0; i < 2; i++) {
            for (let player of match.teams[i]!) {
                if (!this.tags.includes(player.tag)) {
                    this.tags.push(player.tag);
                    this.new_tags.push(player.tag);
                }
            }
        }
        this.matches.push(this.createMatchID(match));
        this.new_matches.push(this.createMatchID(match));
    }

    private async initBrawlers() {
        let results: { [key: string]: any } = {};

        results = {};
        for (let brawler of this.brawlers) {
            results[brawler] = {};
            results[brawler]["TOTAL"] = {
                total: 0,
                win: 0,
                lose: 0,
                draw: 0,
            };
            for (let other_brawler of this.brawlers) {
                if (other_brawler !== brawler) {
                    results[brawler][other_brawler] = {
                        total: 0,
                        win: 0,
                        lose: 0,
                        draw: 0,
                    };
                }
            }
        }
        results.TOTAL = 0;
        return results;
    }
}
