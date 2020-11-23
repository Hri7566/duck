"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var gConfig = __importStar(require("./config.json"));
var fs = require("fs");
var chalk = require("chalk");
var Bot = /** @class */ (function () {
    function Bot() {
        this.prefixes;
        this.config = gConfig;
        this.prefixes = this.config.prefixes;
        this.ranks = require('./ranks.json');
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
    Bot.prototype.warn = function (str) {
        this.log(chalk.yellow("Warning: " + str));
    };
    Bot.prototype.f = function (msg) {
        var _this = this;
        var ret = "";
        msg.a = msg.content;
        msg.bot = this;
        msg.p.rank = this.getRank(msg.p);
        msg.args = msg.a.split(' ');
        var hasPrefix = false;
        this.prefixes.forEach(function (prefix) {
            if (msg.a.includes(prefix)) {
                hasPrefix = true;
            }
            switch (_this.config.prefixStyle) {
                case "word":
                    if (msg.args[1]) {
                        msg.cmd = msg.args[1];
                        msg.argcat = msg.a.substring(msg.args[0].length + msg.args[1].length + 1).trim();
                    }
                    break;
                default:
                    msg.cmd = msg.args[0].split(prefix).join('');
                    msg.argcat = msg.a.substring(msg.cmd.length + prefix.length).trim();
                    break;
            }
        });
        if (hasPrefix) {
            this.commands.forEach(function (cmd) {
                var runCommand = false;
                if (typeof (cmd.cmd) == "string") {
                    if (msg.cmd == cmd.cmd) {
                        runCommand = true;
                    }
                }
                else {
                    cmd.cmd.forEach(function (c) {
                        if (msg.cmd == c) {
                            runCommand = true;
                        }
                    });
                }
                if (runCommand) {
                    if (msg.p.rank.id >= 0) {
                        if (msg.p.rank.id >= cmd.minrank) {
                            ret = cmd.func(msg);
                        }
                        else {
                            ret = msg.p.name + " thought they could use " + msg.cmd + "!";
                        }
                    }
                    else {
                        ret = "no u banned!";
                    }
                }
                else {
                }
            });
        }
        return ret;
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
        ret = ret.replace(/ +(?= )/g, "");
        return ret;
    };
    Bot.prototype.getRank = function (p) {
        var ret;
        var ranks = this.ranks;
        for (var id in ranks) {
            var rp = ranks[id];
            if (id == p._id) {
                ret = rp;
            }
        }
        return ret;
    };
    Bot.prototype.runInContext = function (str) {
        try {
            return 'Console: ' + eval(str);
        }
        catch (err) {
            return err;
        }
    };
    return Bot;
}());
module.exports = Bot;
