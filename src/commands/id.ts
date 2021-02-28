import Command = require('../Command');

let command: Command;

command = {
    cmd: ["id","myid"],
    usage: `i teach: PREFIXid`,
    minargs: 0,
    func: msg => {
        return `you id ${msg.p._id}`;
    },
    minrank: 0,
    hidden: false
}

export = command;