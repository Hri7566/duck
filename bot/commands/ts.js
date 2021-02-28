"use strict";
var command;
command = {
    cmd: 'ts',
    usage: "i teach: PREFIXts (string)",
    minargs: 0,
    func: function (msg) {
        return msg.bot.runInContext(msg.argcat);
    },
    minrank: 4,
    hidden: false
};
module.exports = command;
