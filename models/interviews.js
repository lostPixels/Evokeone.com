// again, load dynamically in future
// mock = mock data
var interviewData = require('../data/interview/forever.json');

function get(id){
  interviewData = preprocess(interviewData);
  return interviewData;
}

function preprocess(data){
  var initialVars = ['interviewer1', 'interviewer2', 'artist'];
  initialVars.forEach(function(v){
      if(data[v]) {
        data[v + "-initials"] = initials(data[v]);
      }
  });
  return data;
}

function initials(s){
  var output = "";
  s.split(" ").forEach(function(name){
    output += name.charAt(0).toUpperCase();
  });
  return output;
}

module.exports.get = get;
