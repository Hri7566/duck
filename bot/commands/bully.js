"use strict";
var command;
var bullyarr = [
    "`hey ${msg.argcat} get dead`",
    "`you suck ${msg.argcat}`",
    "`hey ${msg.argcat} go fuck a couch cushion`",
    "`${msg.argcat} is unfuckable`",
    "`${msg.argcat} is the human embodiment of the voice in your head that tells you to crash your car while you're driving`",
    "`${msg.argcat} looks like the 12 year old version of a 40 year old`",
    "`i wanna pick ${msg.argcat} up and do a pretzel twist`",
    "`i watched ${msg.argcat} give cpr to a mcchicken`",
    "`${msg.argcat} has a personality of a dry-cleaned flannel draped over an acoustic guitar that's never been played`",
    "`if ${msg.argcat} were to run into a wall with a boner, they would break their nose`",
    "`${msg.argcat} looks like a tom cruise model from a ps2 game`",
    "`${msg.argcat} is as sexy as a crumpled Wendy's bag full of hornets`",
    "`${msg.argcat} looks more like a router than the ps5`",
    "`${msg.argcat} looks like buffalo bill`",
    "`${msg.argcat}'s mother smoked while they were pregnant`",
    "`${msg.argcat} was featured in top 10 condom fails`",
    "`${msg.argcat} is a sunburnt thumb`",
    "`you could measure ${msg.argcat}'s forehead and listen to symphony no. 9 in d minor eight times and still won't be finished`",
    "`${msg.argcat} sings like i drink bongwater`",
    "`${msg.argcat} is a fucking anorexic ice cream cone`",
    "`an${msg.argcat}emia`",
    "`take a fucking shower ${msg.argcat}`",
    "`${msg.argcat} is a two pack of ass`",
    "`aint fault mine ${msg.argcat} dont do good read, fuckin hot dog`",
    "`${msg.argcat} shares missing dog posts from other countries`",
    "`${msg.argcat} is about to get roasted better than my barbecue chicken sandwich`",
    "`${msg.argcat} sounds like mickey mouse's meth addict cousin, rickey rat`",
    "`${msg.argcat} looks like reptar and yellow teletubbie had a baby`",
    "`${msg.argcat} plays dating sims in their basement and gets disappointed when the pickup lines don't work on their siblings`",
    "`there are no apartments for sale that are as big as ${msg.argcat}'s forehead`",
    "`${msg.argcat} is the product of vegetable mashing`",
    "`${msg.argcat} go brrrrrrrr`",
    "`${msg.argcat} has grapes for toes`"
];
command = {
    cmd: 'bully',
    usage: "i teach: PREFIXbully (string)",
    minargs: 1,
    func: function (msg) {
        var randstr = bullyarr[Math.floor(Math.random() * bullyarr.length)];
        var rand = eval(randstr);
        return rand;
    },
    minrank: 0,
    hidden: false
};
module.exports = command;
