interface IRule {
    meta: string | { [key: string]: any }[];
    vs: [string, string][];
}

export default class Rules {
    public static general: IRule = {
        meta: [],
        vs: [
            ["COLETTE", "FRANK"],
            ["COLETTE", "BULL"],
            ["COLETTE", "ASH"],
            ["COLETTE", "BUSTER"],
            ["COLETTE", "EL PRIMO"],
        ],
    };
    public static maps: { [key: string]: IRule } = {
        "Shooting Star": { meta: [{ range: "high" }], vs: [] },
        "Canal Grande": { meta: [], vs: [] },
        "Layer Cake": { meta: [], vs: [] },
        "Crystal Arcade": { meta: [], vs: [] },
        "Double Swoosh": { meta: [], vs: [] },
        "Hard Rock Mine": { meta: [], vs: [] },
        "Bridge Too Far": { meta: [{ range: "high" }], vs: [] },
        "Safe Zone": { meta: [{ range: "high" }], vs: [] },
        "Pit Stop": { meta: [], vs: [] },
        "Super Beach": { meta: [], vs: [] },
        "Pinhole Punt": { meta: [], vs: [] },
        "Sneaky Fields": { meta: [], vs: [] },
        "Dueling Beetles": { meta: [], vs: [] },
        "Open Zone": { meta: [], vs: [] },
        "Ring of Fire": { meta: [], vs: [] },
        "Belle's Rock": { meta: [], vs: [] },
        "Goldarm Gulch": { meta: [], vs: [] },
        "Out in the Open": { meta: [], vs: [] },
    };
}
