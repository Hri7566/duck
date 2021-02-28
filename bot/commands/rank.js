"use strict";
var command;
command = {
    cmd: "rank",
    usage: "i teach: PREFIXrank",
    minargs: 0,
    func: function (msg) {
        return "your are " + msg.p.rank.name;
    },
    minrank: 0,
    hidden: false
};
module.exports = command;
