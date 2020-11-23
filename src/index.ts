import * as gConfig from './config.json';
import fs = require('fs');
import Command = require('./Command');
import Rank = require('./Rank');
import chalk = require('chalk');
import Ranks = require('./Ranks');

class Bot {
    prefixes: Array<string>;
    config: Config;
    commands: Array<Command>;
    ranks: any;
    constructor () {
        this.prefixes;
        this.config = gConfig;
        this.prefixes = this.config.prefixes;
        this.ranks = require('./ranks.json');
        this.commands = [];
    }

    start() {
        this.log(`Started`);
        let files = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'));
        for (const file of files) {
            const command = require(`./commands/${file}`);
            this.commands.push(command);
        }
    }

    log(str) {
        console.log(`Bot: ${str}`);
    }

    warn(str) {
        this.log(chalk.yellow(`Warning: ${str}`));
    }

    f(msg: any) {
        let ret = "";
        msg.a = msg.content;
        msg.bot = this;
        msg.p.rank = this.getRank(msg.p);
        if (typeof(msg.p.rank) == 'undefined') {
            msg.p.rank = {
                name: "User",
                id: 0,
                rank: Ranks.USER
            }
        }
        msg.args = msg.a.split(' ');

        let hasPrefix = false;
        this.prefixes.forEach(prefix => {
            if (msg.a.includes(prefix)) {
                hasPrefix = true;
            }
            switch (this.config.prefixStyle) {
                case "word":
                    if (msg.args[1]) {
                        msg.cmd = msg.args[1];
                        msg.argcat = msg.a.substring(msg.args[0].length + msg.args[1].length + 1).trim();
                    }
                    break;
                default:
                    msg.cmd = msg.args[0].split(prefix).join('');
                    msg.argcat = msg.a.substring(msg.cmd.length + prefix.length).trim()
                    break;
            }
        });
        if (hasPrefix) {
            this.commands.forEach(cmd => {
                let runCommand = false;
                if (typeof(cmd.cmd) == "string") {
                    if (msg.cmd == cmd.cmd) {
                        runCommand = true;
                    }
                } else {
                    cmd.cmd.forEach(c => {
                        if (msg.cmd == c) {
                            runCommand = true;
                        }
                    });
                }
                if (runCommand) {
                    if (msg.p.rank.id >= 0) {
                        if (msg.p.rank.id >= cmd.minrank) {
                            let num = 1;
                            if (this.config.prefixStyle == "word") {
                                num = 2;
                            }
                            if (msg.args.length >= cmd.minargs + num) {
                                ret = cmd.func(msg);
                            } else {
                                ret = this.getUsage(msg.cmd);
                            }
                        } else {
                            ret = `${msg.p.name} thought they could use ${msg.cmd}!`;
                        }
                    } else {
                        ret = `no u banned!`;
                    }
                } else {
                    
                }
            });
        }
        return ret;
    }

    getUsage(cmd) {
        let ret = "";
        this.commands.forEach(c => {
            if (c.usage == null || typeof(c.usage) !== "string") return;
            switch (typeof(c.cmd)) {
                case "string":
                    if (cmd == c.cmd.toLowerCase()) {
                        if (this.config.prefixStyle == "word") {
                            ret = c.usage.replace("PREFIX", "");
                        } else {
                            ret = c.usage.replace("PREFIX", this.prefixes[0]);
                        }
                    }
                    break;
                case "object":
                    c.cmd.forEach(cm => {
                        if (cmd == cm.toLowerCase()) {
                            if (this.config.prefixStyle == "word") {
                                ret = c.usage.replace("PREFIX", "");
                            } else {
                                ret = c.usage.replace("PREFIX", this.prefixes[0]);
                            }
                        }
                    });
                    break;
            }
        });

        if (ret == "") {
            ret = `i don't see ${cmd}`;
        }

        ret = ret.replace(/ +(?= )/g, "");

        return ret;
    }

    getRank(p: any) {
        let ret;
        let ranks = this.ranks;
        for (let id in ranks) {
            let rp = ranks[id];
            if (id == p._id) {
                ret = rp;
            }
        }
        return ret;
    }

    runInContext(str) {
        try {
            return 'Console: ' + eval(str);
        } catch (err) {
            return err;
        }
    }

    saveRanks() {
        fs.writeFile(__dirname+'/ranks.json', JSON.stringify(this.ranks), {encoding: 'utf-8'}, () => {
            this.log('Ranks saved');
        });
    }

    setRank(p: any, rank: Ranks) {
        if (typeof(p) == 'undefined' || typeof(p._id) == 'undefined') return;
        switch (rank) {
            case Ranks.OWNER:
                this.ranks[p._id] = {
                    name: "Owner",
                    id: 2,
                    rank: rank
                };
                break;
            case Ranks.ADMIN:
                this.ranks[p._id] = {
                    name: "Admin",
                    id: 1,
                    rank: rank
                };
                break;
            case Ranks.USER:
            default:
                this.ranks[p._id] = {
                    name: "User",
                    id: 0,
                    rank: rank
                }
        }
    }
}

interface Config {
    prefixes: Array<string>;
    prefixStyle: string;
}

export = Bot;
