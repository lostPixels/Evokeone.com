//This file should eventually dynamically require the exhibit data based on the ID that is passed in.
var exhibitData = require('../data/exhibit/forever.json');
function get(exhibitID) {
  exhibitData['showTracklist'] = true;
    return exhibitData;
}

module.exports.get = get;
