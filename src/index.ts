import * as gConfig from './config.json';
import fs = require('fs');

class Bot {
    prefixes: Array<string>;
    config: Config;
    commands: Array<Command>;
    constructor () {
        this.prefixes;
        this.config = gConfig;
        this.prefixes = this.config.prefixes;
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

    f(msg: any, prefix: string) {
        let ret = "";
        msg.p.rank = {
            name: "User",
            id: 0
        }
        if (msg.a.startsWith(prefix)) {
            let ret;
            this.commands.forEach(cmd => {
                if (msg.p.rank.id >= 0) {
                    if (msg.p.rank.id >= cmd.minrank) {
                        switch (typeof(cmd.cmd)) {
                            case "string":
                                if (msg.cmd == cmd.cmd) {
                                    ret = cmd.func(msg);
                                }
                                break;
                            case "object":
                                cmd.cmd.forEach(c => {
                                    if (msg.cmd == c) {
                                        ret = cmd.func(msg);
                                    }
                                });
                                break;
                        }
                    } else {
                        ret = `no perms, birb friend`;
                    }
                } else {
                    ret = `u is ban`;
                }
            });
            return ret;
        }
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

        return ret;
    }
}

interface Config {
    prefixes: Array<string>;
    prefixStyle: string;
}

interface Command {
    cmd: any;
    usage: string;
    minargs: number;
    func: (msg: any) => string;
    minrank: number;
    hidden: boolean;
}

export = Bot;
