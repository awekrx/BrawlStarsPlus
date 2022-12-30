type TPointer = "high" | "normal" | "low";
type TRarity = "starting" | "rare" | "super rare" | "epic" | "mythic" | "legendary" | "chromatic";

interface Brawler {
    [key: string]: string | boolean;
    name: string;
    rarity: TRarity;
    range: TPointer;
    damage: TPointer;
    survival: TPointer;
    mobility: TPointer;
    has_stuns: boolean;
    healer: boolean;
}

export default class Data {
    public static maps: string[] = [
        "Shooting Star",
        "Canal Grande",
        "Layer Cake",
        "Crystal Arcade",
        "Double Swoosh",
        "Hard Rock Mine",
        "Bridge Too Far",
        "Safe Zone",
        "Pit Stop",
        "Super Beach",
        "Pinhole Punt",
        "Sneaky Fields",
        "Dueling Beetles",
        "Open Zone",
        "Ring of Fire",
        "Belle's Rock",
        "Goldarm Gulch",
        "Out in the Open",
    ];
    public static brawlers_names: string[] = [
        "SHELLY",

        "COLT",
        "BULL",
        "BROCK",
        "BARLEY",
        "NITA",
        "EL PRIMO",
        "POCO",
        "ROSA",

        "RICO",
        "JESSIE",
        "DYNAMIKE",
        "DARRYL",
        "PENNY",
        "TICK",
        "CARL",
        "8-BIT",
        "JACKY",
        "GUS",

        "BO",
        "PIPER",
        "PAM",
        "FRANK",
        "BIBI",
        "BEA",
        "EMZ",
        "GALE",
        "NANI",
        "EDGAR",
        "STU",
        "GROM",
        "GRIFF",
        "BONNIE",

        "MORTIS",
        "TARA",
        "GENE",
        "MR. P",
        "MAX",
        "SPROUT",
        "BYRON",
        "SQUEAK",
        "GRAY",

        "SPIKE",
        "CROW",
        "LEON",
        "SANDY",
        "AMBER",
        "MEG",
        "CHESTER",

        "SURGE",
        "COLETTE",
        "LOU",
        "RUFFS",
        "BELLE",
        "BUZZ",
        "ASH",
        "LOLA",
        "FANG",
        "EVE",
        "JANET",
        "OTIS",
        "SAM",
        "BUSTER",
        "MANDY",
    ];

    public static brawlers: { [key: string]: Brawler } = {
        SHELLY: {
            name: "SHELLY",
            rarity: "starting",
            range: "low",
            damage: "normal",
            survival: "normal",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        COLT: {
            name: "COLT",
            rarity: "rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        BULL: {
            name: "BULL",
            rarity: "rare",
            range: "low",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        BROCK: {
            name: "BROCK",
            rarity: "rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        BARLEY: {
            name: "BARLEY",
            rarity: "rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        NITA: {
            name: "NITA",
            rarity: "rare",
            range: "normal",
            damage: "low",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        "EL PRIMO": {
            name: "EL PRIMO",
            rarity: "rare",
            range: "low",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        POCO: {
            name: "POCO",
            rarity: "rare",
            range: "normal",
            damage: "low",
            survival: "high",
            mobility: "low",
            has_stuns: false,
            healer: true,
        },
        ROSA: {
            name: "ROSA",
            rarity: "rare",
            range: "normal",
            damage: "high",
            survival: "high",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        RICO: {
            name: "RICO",
            rarity: "super rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        JESSIE: {
            name: "JESSIE",
            rarity: "super rare",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        DYNAMIKE: {
            name: "DYNAMIKE",
            rarity: "super rare",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        DARRYL: {
            name: "DARRYL",
            rarity: "super rare",
            range: "low",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        PENNY: {
            name: "PENNY",
            rarity: "super rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        TICK: {
            name: "TICK",
            rarity: "super rare",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        CARL: {
            name: "CARL",
            rarity: "super rare",
            range: "high",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        "8-BIT": {
            name: "8-BIT",
            rarity: "super rare",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        JACKY: {
            name: "JACKY",
            rarity: "super rare",
            range: "low",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        GUS: {
            name: "GUS",
            rarity: "super rare",
            range: "high",
            damage: "low",
            survival: "normal",
            mobility: "low",
            has_stuns: false,
            healer: true,
        },
        BO: {
            name: "BO",
            rarity: "epic",
            range: "high",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        PIPER: {
            name: "PIPER",
            rarity: "epic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        PAM: {
            name: "PAM",
            rarity: "epic",
            range: "normal",
            damage: "normal",
            survival: "high",
            mobility: "low",
            has_stuns: false,
            healer: true,
        },
        FRANK: {
            name: "FRANK",
            rarity: "epic",
            range: "normal",
            damage: "high",
            survival: "normal",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        BIBI: {
            name: "BIBI",
            rarity: "epic",
            range: "low",
            damage: "high",
            survival: "normal",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        BEA: {
            name: "BEA",
            rarity: "epic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        EMZ: {
            name: "EMZ",
            rarity: "epic",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        GALE: {
            name: "GALE",
            rarity: "epic",
            range: "normal",
            damage: "low",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        NANI: {
            name: "NANI",
            rarity: "epic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        EDGAR: {
            name: "EDGAR",
            rarity: "epic",
            range: "low",
            damage: "high",
            survival: "low",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        STU: {
            name: "STU",
            rarity: "epic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        GROM: {
            name: "GROM",
            rarity: "epic",
            range: "high",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        GRIFF: {
            name: "GRIFF",
            rarity: "epic",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        BONNIE: {
            name: "BONNIE",
            rarity: "epic",
            range: "high",
            damage: "normal",
            survival: "normal",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        MORTIS: {
            name: "MORTIS",
            rarity: "mythic",
            range: "low",
            damage: "low",
            survival: "normal",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        TARA: {
            name: "TARA",
            rarity: "mythic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        GENE: {
            name: "GENE",
            rarity: "mythic",
            range: "normal",
            damage: "low",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        "MR. P": {
            name: "MR. P",
            rarity: "mythic",
            range: "normal",
            damage: "low",
            survival: "normal",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        MAX: {
            name: "MAX",
            rarity: "mythic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        SPROUT: {
            name: "SPROUT",
            rarity: "mythic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        BYRON: {
            name: "BYRON",
            rarity: "mythic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: true,
        },
        SQUEAK: {
            name: "SQUEAK",
            rarity: "mythic",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        GRAY: {
            name: "GRAY",
            rarity: "mythic",
            range: "high",
            damage: "low",
            survival: "low",
            mobility: "high",
            has_stuns: true,
            healer: false,
        },
        SPIKE: {
            name: "SPIKE",
            rarity: "legendary",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        CROW: {
            name: "CROW",
            rarity: "legendary",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        LEON: {
            name: "LEON",
            rarity: "legendary",
            range: "high",
            damage: "normal",
            survival: "normal",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        SANDY: {
            name: "SANDY",
            rarity: "legendary",
            range: "normal",
            damage: "normal",
            survival: "normal",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        AMBER: {
            name: "AMBER",
            rarity: "legendary",
            range: "high",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        MEG: {
            name: "MEG",
            rarity: "legendary",
            range: "high",
            damage: "normal",
            survival: "normal",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        CHESTER: {
            name: "CHESTER",
            rarity: "legendary",
            range: "normal",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        SURGE: {
            name: "SURGE",
            rarity: "chromatic",
            range: "normal",
            damage: "normal",
            survival: "normal",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        COLETTE: {
            name: "COLETTE",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "normal",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        LOU: {
            name: "LOU",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        RUFFS: {
            name: "RUFFS",
            rarity: "chromatic",
            range: "normal",
            damage: "low",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        BELLE: {
            name: "BELLE",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        BUZZ: {
            name: "BUZZ",
            rarity: "chromatic",
            range: "low",
            damage: "normal",
            survival: "normal",
            mobility: "normal",
            has_stuns: true,
            healer: false,
        },
        ASH: {
            name: "ASH",
            rarity: "chromatic",
            range: "normal",
            damage: "normal",
            survival: "high",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        LOLA: {
            name: "LOLA",
            rarity: "chromatic",
            range: "high",
            damage: "high",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        FANG: {
            name: "FANG",
            rarity: "chromatic",
            range: "low",
            damage: "normal",
            survival: "normal",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        EVE: {
            name: "EVE",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "normal",
            has_stuns: false,
            healer: false,
        },
        JANET: {
            name: "JANET",
            rarity: "chromatic",
            range: "normal",
            damage: "normal",
            survival: "low",
            mobility: "high",
            has_stuns: false,
            healer: false,
        },
        OTIS: {
            name: "OTIS",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: true,
            healer: false,
        },
        SAM: {
            name: "SAM",
            rarity: "chromatic",
            range: "low",
            damage: "high",
            survival: "normal",
            mobility: "high",
            has_stuns: true,
            healer: false,
        },
        BUSTER: {
            name: "BUSTER",
            rarity: "chromatic",
            range: "normal",
            damage: "normal",
            survival: "normal",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
        MANDY: {
            name: "MANDY",
            rarity: "chromatic",
            range: "high",
            damage: "normal",
            survival: "low",
            mobility: "low",
            has_stuns: false,
            healer: false,
        },
    };
}