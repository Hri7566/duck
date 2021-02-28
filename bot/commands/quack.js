"use strict";
var command;
command = {
    cmd: ["quack"],
    usage: null,
    minargs: 0,
    func: function (msg) {
        return "quack :P";
    },
    minrank: 0,
    hidden: true
};
module.exports = command;
