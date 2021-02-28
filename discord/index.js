/**
 * @class
 */

const Discord = require('discord.js');

module.exports = class {
    
    /**
     * Discord listener
     * @callback cb
     * @param {string} token Discord token
     * @param {Discord~callback} cb Callback
     * @param {object} msg
     */

    constructor (token, cb) {
        this.token = token;
        this.client = new Discord.Client();
        this.cb = cb;
        this.msg = {};
    }

    cb(msg) {

    }

    log(str) {
        console.log(`Discord: ${str}`);
    }

    chat(str) {
        this.msg.channel.send(`\u034f${str}`);
    }

    start() {
        this.client.login(this.token);
        delete this.token;
        this.listen();
        this.client.on('ready', () => {
            this.log('Online');
        });
    }

    listen() {
        this.client.on('message', msg => {
            msg.a = msg.content;
            msg.p = {
                name: msg.author.username,
                _id: msg.author.id
            }
            msg.args = msg.a.split(' ');
            msg.discord = this;
            this.cb(msg);
        });
    }

    /**
     * @callback Discord~callback
     */
}