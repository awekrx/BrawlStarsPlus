import path from "path";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

import Server from "./classes/Server";
import BrawlStarsPlus from "./classes/BrawlStarsPlus";

let BSP: BrawlStarsPlus;
let server: Server;

(async () => {
    if (typeof process.env.TOKEN === "string" && typeof process.env.DBURL === "string") {
        BSP = new BrawlStarsPlus(process.env.TOKEN, process.env.DBURL);
        await BSP.start();
        // BSP.parse();
        server = new Server(path.join(__dirname, "index.html"), path.join(path.dirname(__dirname), "/public"), BSP);
        server.start();
        setInterval(() => {
            if (typeof process.env.ANTISLEEP === "string") {
                axios.get(process.env.ANTISLEEP);
            }
        }, 5 * 60 * 1000 - 10_000);
    } else {
        console.log("Set up environment variables");
        process.exit(1);
    }
})();
