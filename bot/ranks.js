"use strict";
var Ranks;
(function (Ranks) {
    Ranks[Ranks["USER"] = 0] = "USER";
    Ranks[Ranks["ADMIN"] = 1] = "ADMIN";
    Ranks[Ranks["OWNER"] = 2] = "OWNER";
})(Ranks || (Ranks = {}));
module.exports = Ranks;
