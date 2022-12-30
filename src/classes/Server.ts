import dotenv from "dotenv";
dotenv.config();

import express from "express";
import BrawlStarsPlus from "./BrawlStarsPlus";
import ServerRouter from "./ServerRouter";

export default class Server {
    private app: express.Application;

    constructor(index_path: string, public_path: string, BSP: BrawlStarsPlus) {
        this.app = express();
        this.app.set("port", process.env.PORT);
        this.app.use(new ServerRouter(index_path, BSP).router);
        this.app.use(express.static(public_path));
    }
    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening in port ${this.app.get("port")}`);
        });
    }
}
