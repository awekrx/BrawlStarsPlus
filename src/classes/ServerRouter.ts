import express, { Router } from "express";
import AppController from "./AppController";
import BrawlStarsPlus from "./BrawlStarsPlus";

export default class ServerRouter {
    public router: Router;
    private controller: AppController;

    constructor(path: string, BSP: BrawlStarsPlus) {
        this.controller = new AppController(path, BSP);
        this.router = express.Router();
        this.registryRoutes();
    }

    private registryRoutes() {
        this.router.get("/", this.controller.main.bind(this.controller));
        this.router.get("/api/results", this.controller.main.bind(this.controller));
        this.router.get("/api/brawlers", this.controller.api.brawlers.bind(this.controller));
        this.router.get("/api/maps", this.controller.api.maps.bind(this.controller));
        this.router.get("/api/analyze", this.controller.api.analyze.bind(this.controller));
        this.router.get("/api/map/:name", this.controller.api.map.bind(this.controller));
        // this.router.get("/:name", (req, res) => {
        //     if (
        //         req.params.name !== "scripts" &&
        //         req.params.name !== "pages" &&
        //         req.params.name !== "images" &&
        //         req.params.name !== "styles" &&
        //         req.params.name !== "favicon.ico"
        //     )
        //         res.redirect("/");
        // });
    }
}
