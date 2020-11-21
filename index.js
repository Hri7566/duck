require('dotenv').config();

global.TOKEN = process.env.TOKEN || "";

const Bot = require('./bot');
var bot = new Bot();

const Discord = require('./discord');
var discord = new Discord(TOKEN, msg => {
    bot.prefixes.forEach(prefix => {
        msg.cmd = msg.args[0].toLowerCase().split(prefix).join("");
        msg.argcat = msg.a.substring(msg.cmd.length + prefix.length).trim();
        
    });
});

discord.start();

bot.start();