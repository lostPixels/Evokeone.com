var exhibitModel = require('./exhibits');
var _ = require('lodash');

function get(exhibitID, submissionID) {
    var exhibit = exhibitModel.get(exhibitID);

    var i = _.findIndex(exhibit.art, {id:submissionID});
    var submission = exhibit.art[i];
    submission.exhibit = exhibit;
    if(i > 0) {
        submission.prev = exhibit.art[i - 1];
    }

    if( i < exhibit.art.length -1) {
        submission.next = exhibit.art[i + 1];
    }

    // for audio tracks
    submission['autoPlay'] = true;
    return submission;
}

module.exports.get = get;
