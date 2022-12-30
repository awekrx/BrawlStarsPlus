import Data from "./Data";
import db, { Model } from "mongoose";
db.set("strictQuery", true);

interface ITag {
    tag: string;
}

interface IMatch {
    id: string;
}

interface IMap {
    [key: string]: any;
}

interface DBMap {
    [key: string]: Model<IMap>;
}

export default class DataBase {
    private instance!: this;
    private Tag!: Model<ITag>;
    private Match!: Model<IMatch>;
    private Map: DBMap = {};
    constructor(url: string) {
        if (this.instance) {
            return this.instance;
        }
        this.instance = this;
        db.connect(url);
        this.Tag = db.model<ITag>("tag", new db.Schema<ITag>({ tag: { type: String, required: true } }));
        this.Match = db.model<IMatch>("match", new db.Schema<IMatch>({ id: { type: String, required: true } }));
        for (let map of Data.maps) {
            this.Map[map] = db.model<IMap>(
                map,
                new db.Schema<IMap>({ name: { type: String, required: true }, data: {} }),
            );
        }
    }

    public async saveAllTags(tags: string[]): Promise<void> {
        let data: ITag[] = [];
        for (let tag of tags) {
            data.push({ tag: tag });
        }
        await this.Tag.insertMany(data);
    }
    public async saveTag(tag: string): Promise<void> {
        await new this.Tag({ value: tag }).save();
    }
    public async saveAllMatches(matches: string[]): Promise<void> {
        let data: IMatch[] = [];
        for (let match of matches) {
            data.push({ id: match });
        }
        await this.Match.insertMany(data);
    }
    public async saveMatch(id: string): Promise<void> {
        await new this.Match({ id: id }).save();
    }
    public async saveAllMaps(data: { [key: string]: IMap }): Promise<void> {
        for (let map in data) {
            await this.saveMap(map, data[map]);
        }
    }
    public async saveMap(name: string, data: IMap): Promise<void> {
        let brawlers: { name: string; data: any }[] = [];
        for (let brawler in data) {
            brawlers.push({ name: brawler, data: data[brawler] });
        }
        await this.Map[name].insertMany(brawlers);
    }

    public async getTags(): Promise<string[]> {
        let data = await this.Tag.find({}, "-_id");
        let new_data: string[] = [];
        for (let i = 0; i < data.length; i++) {
            new_data[i] = data[i].tag;
        }
        return new_data;
    }
    public async getMatches(): Promise<string[]> {
        let data = await this.Match.find({}, "-_id");
        let new_data: string[] = [];
        for (let i = 0; i < data.length; i++) {
            new_data[i] = data[i].id;
        }
        return new_data;
    }
    public async getMatch(id: string): Promise<string> {
        let data = await this.Match.find({ id: id }, "-_id");
        if (data.length > 0) {
            return data[0].id;
        } else {
            return "";
        }
    }
    public async getAllMaps(): Promise<any> {
        let data: { [key: string]: IMap } = {};
        for (let map of Data.maps) {
            data[map] = await this.getMap(map);
        }
        return data;
    }
    public async getMap(name: string): Promise<IMap> {
        let data = await this.Map[name].find({}, "-_id");
        let new_data: IMap = {};
        for (let i = 0; i < data.length; i++) {
            new_data[data[i].name] = data[i].data;
        }
        return new_data;
    }

    public async updateAllMaps(data: { [key: string]: IMap }): Promise<void> {
        for (let map in data) {
            await this.updateMap(map, data[map]);
        }
    }
    public async updateMap(name: string, data: IMap): Promise<void> {
        for (let brawler in data) {
            await this.Map[name].updateOne({ name: brawler }, { data: data[brawler] });
        }
    }

    public async deleteTag(tag: string): Promise<void> {
        await this.Tag.deleteOne({ value: tag });
    }
}
