import Command = require('../Command');

let command: Command;

command = {
    cmd: ["quack"],
    usage: null,
    minargs: 0,
    func: msg => {
        return "quack :P";
    },
    minrank: 0,
    hidden: true
}

export = command;