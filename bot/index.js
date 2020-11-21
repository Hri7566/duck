"use strict";
var gConfig = require("./config.json");
var fs = require("fs");
var Bot = /** @class */ (function () {
    function Bot() {
        this.prefixes;
        this.config = gConfig;
        this.prefixes = this.config.prefixes;
        this.commands = [];
    }
    Bot.prototype.start = function () {
        this.log("Started");
        var files = fs.readdirSync(__dirname + '/commands').filter(function (file) { return file.endsWith('.js'); });
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var command = require("./commands/" + file);
            this.commands.push(command);
        }
    };
    Bot.prototype.log = function (str) {
        console.log("Bot: " + str);
    };
    Bot.prototype.f = function (msg, prefix) {
        var ret = "";
        msg.p.rank = {
            name: "User",
            id: 0
        };
        if (msg.a.startsWith(prefix)) {
            var ret_1;
            this.commands.forEach(function (cmd) {
                if (msg.p.rank.id >= 0) {
                    if (msg.p.rank.id >= cmd.minrank) {
                        switch (typeof (cmd.cmd)) {
                            case "string":
                                if (msg.cmd == cmd.cmd) {
                                    ret_1 = cmd.func(msg);
                                }
                                break;
                            case "object":
                                cmd.cmd.forEach(function (c) {
                                    if (msg.cmd == c) {
                                        ret_1 = cmd.func(msg);
                                    }
                                });
                                break;
                        }
                    }
                    else {
                        ret_1 = "no perms, birb friend";
                    }
                }
                else {
                    ret_1 = "u is ban";
                }
            });
            return ret_1;
        }
    };
    Bot.prototype.getUsage = function (cmd) {
        var _this = this;
        var ret = "";
        this.commands.forEach(function (c) {
            if (c.usage == null || typeof (c.usage) !== "string")
                return;
            switch (typeof (c.cmd)) {
                case "string":
                    if (cmd == c.cmd.toLowerCase()) {
                        if (_this.config.prefixStyle == "word") {
                            ret = c.usage.replace("PREFIX", "");
                        }
                        else {
                            ret = c.usage.replace("PREFIX", _this.prefixes[0]);
                        }
                    }
                    break;
                case "object":
                    c.cmd.forEach(function (cm) {
                        if (cmd == cm.toLowerCase()) {
                            if (_this.config.prefixStyle == "word") {
                                ret = c.usage.replace("PREFIX", "");
                            }
                            else {
                                ret = c.usage.replace("PREFIX", _this.prefixes[0]);
                            }
                        }
                    });
                    break;
            }
        });
        if (ret == "") {
            ret = "i don't see " + cmd;
        }
        return ret;
    };
    return Bot;
}());
module.exports = Bot;
