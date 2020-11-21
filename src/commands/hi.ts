import Command = require('../Command');

let command: Command;

command = {
    cmd: ["hi","hi!","hello","hello!","hey","hey!","sup","sup!"],
    usage: null,
    minargs: 0,
    func: msg => {
        return "hi!";
    },
    minrank: 0,
    hidden: true
}

export = command;