import Command = require('../Command');

let command: Command;

command = {
    cmd: 'ts',
    usage: `i teach: PREFIXts (string)`,
    minargs: 0,
    func: msg => {
        return msg.bot.runInContext(msg.argcat);
    },
    minrank: 4,
    hidden: false
}

export = command;