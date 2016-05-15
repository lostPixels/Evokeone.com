//This file should eventually dynamically require the exhibit data based on the ID that is passed in.
var exhibitData = require('./../exhibitdata/forever.json');
function get(exhibitID) {
    return exhibitData;
}

module.exports.get = get;
