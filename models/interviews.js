// again, load dynamically in future
// mock = mock data
var interviewData = require('../data/interview/forever-mock.json');

function get(id){
  return interviewData;
}

module.exports.get = get;
