import Command = require('../Command');

let command: Command;

command = {
    cmd: ["hi","hi!","hello","hello!","hey","hey!","sup","sup!", "greetings", "greetings!", "aloha", "aloha!", "heya", "heya!", "hoi", "hoi!", "hai", "hai!", "hola", "hola!", "howdy", "howdy!"],
    usage: null,
    minargs: 0,
    func: msg => {
        return "hi!";
    },
    minrank: 0,
    hidden: true
}

export = command;