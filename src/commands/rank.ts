import Command = require('../Command');

let command: Command;

command = {
    cmd: "rank",
    usage: `i teach: PREFIXrank`,
    minargs: 0,
    func: msg => {
        return `your are ${msg.p.rank.name}`;
    },
    minrank: 0,
    hidden: false
}

export = command;