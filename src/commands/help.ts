import Command = require('../Command');

let command: Command;

command = {
    cmd: "help",
    usage: `here, i teach: PREFIXhelp (command)`,
    minargs: 0,
    func: msg => {
        if (msg.argcat == "") {
            let ret = "Commands:";
            msg.bot.commands.forEach(cmd => {
                if (!cmd.hidden) {
                    if (msg.p.rank.id >= cmd.minrank) {
                        if (msg.bot.config.prefixStyle == "word") {
                            switch (typeof(cmd.cmd)) {
                                case "string":
                                    ret += ` ${cmd.cmd}, `;
                                    break;
                                case "object":
                                    ret += ` ${cmd.cmd}, `
                                    break;
                            }
                        } else {
                            switch (typeof(cmd.cmd)) {
                                case "string":
                                    ret += ` ${cmd.cmd}, `;
                                    break;
                                case "object":
                                    ret += ` ${msg.bot.prefixes[0]}${cmd.cmd}, `
                                    break;
                            }
                        }
                    }
                }
            });
            ret = ret.trim()
            ret = ret.substring(0, ret.length - 1);
            return ret;
        } else {
            let ret;
            ret = msg.bot.getUsage(msg.argcat.toLowerCase());
            return ret;
        }
    },
    minrank: 0,
    hidden: false
}

export = command;