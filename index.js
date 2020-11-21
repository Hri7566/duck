require('dotenv').config();

global.TOKEN = process.env.TOKEN || "";

const Bot = require('./bot');
var bot = new Bot();

const Discord = require('./discord');
var discord = new Discord(TOKEN, msg => {
    let ret;
    if (msg.p._id == discord.client.user.id) return;
    discord.msg = msg;
    bot.prefixes.forEach(prefix => {
        switch (bot.config.prefixStyle) {
            case "word":
                msg.cmd = msg.args[1];
                msg.args.shift();
                msg.bot = bot;
                msg.discord = discord;
                msg.argcat = msg.a.substring(`${prefix} ${msg.cmd}`.length).trim();
                ret = bot.f(msg, prefix);
                if (typeof(ret) == 'undefined') return;
                discord.chat(ret);
                break;
            case "char":
                msg.cmd = msg.args[0].split(prefix).join("");
                msg.argcat = msg.a.substring(msg.cmd.length + prefix.length).trim();
                ret = bot.f(msg, prefix);
                if (typeof(ret) == 'undefined') return;
                discord.chat(ret);
                break;
        }
    });
});

discord.start();

bot.start();