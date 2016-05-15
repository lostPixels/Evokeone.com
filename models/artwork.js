var exhibitModel = require('./exhibits');
var _ = require('lodash');

function get(exhibitID, submissionID) {
    var exhibit = exhibitModel.get(exhibitID);
    var submission = _.find(exhibit.artwork, {id:submissionID});
    submission.exhibit = exhibit;
    return submission;
}

module.exports.get = get;
