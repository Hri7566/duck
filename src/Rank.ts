import Ranks = require("./Ranks");

interface Rank {
    name: string;
    id: number;
    type?: Ranks;
}

export = Rank;