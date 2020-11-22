"use strict";
var command;
command = {
    cmd: "help",
    usage: "here, i teach: PREFIXhelp (command)",
    minargs: 0,
    func: function (msg) {
        if (msg.argcat == "") {
            var ret_1 = "Commands:";
            msg.bot.commands.forEach(function (cmd) {
                if (!cmd.hidden) {
                    if (msg.p.rank.id >= cmd.minrank) {
                        if (msg.bot.config.prefixStyle == "word") {
                            switch (typeof (cmd.cmd)) {
                                case "string":
                                    ret_1 += " " + cmd.cmd + ", ";
                                    break;
                                case "object":
                                    ret_1 += " " + cmd.cmd + ", ";
                                    break;
                            }
                        }
                        else {
                            switch (typeof (cmd.cmd)) {
                                case "string":
                                    ret_1 += " " + cmd.cmd + ", ";
                                    break;
                                case "object":
                                    ret_1 += " " + msg.bot.prefixes[0] + cmd.cmd + ", ";
                                    break;
                            }
                        }
                    }
                }
            });
            ret_1 = ret_1.trim();
            ret_1 = ret_1.substring(0, ret_1.length - 1);
            ret_1 = ret_1.replace(/ +(?= )/g, "");
            return ret_1;
        }
        else {
            var ret = void 0;
            ret = msg.bot.getUsage(msg.argcat.toLowerCase());
            return ret;
        }
    },
    minrank: 0,
    hidden: false
};
module.exports = command;
