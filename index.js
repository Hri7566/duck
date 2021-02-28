require('dotenv').config({
    path: __dirname+"/.env"
});

const TOKEN = process.env.TOKEN;

const Bot = require('./bot');

var bot = new Bot();

const Discord = require('./discord');
var discord = new Discord(TOKEN, msg => {
    let ret;
    if (msg.p._id == discord.client.user.id) return;
    discord.msg = msg;
    ret = bot.f(msg);
    if (typeof(ret) == "undefined" || ret == "") return;
    discord.chat(ret);
});

discord.start();

bot.start();
