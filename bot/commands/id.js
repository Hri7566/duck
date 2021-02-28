"use strict";
var command;
command = {
    cmd: ["id", "myid"],
    usage: "i teach: PREFIXid",
    minargs: 0,
    func: function (msg) {
        return "you id " + msg.p._id;
    },
    minrank: 0,
    hidden: false
};
module.exports = command;
