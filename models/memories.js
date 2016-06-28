const
    captcha = require('../util/captcha'),
    dateFormat = require('dateformat'),
    memoryDB = require('./db'),
    view = "memories";


function get(callback){
    memoryDB.list(view, function(result){
        result.forEach(function(memory){
          memory['date'] = formatDate(memory['date']);
        });
        callback({ memories: result });
    });
}

function post(data, callback){
  captcha.verify(data['captcha'], function(success){
    // DEBUGGING so I don't have to keep solving those damn puzzles
    // success = true;

    function cb(result){
      console.log(result);
      data['success'] = success;
      data['date'] = formatDate(data['date']);
      callback(data);
    }

    if(success){
      // don't need to store captcha result
      delete data['captcha'];
      memoryDB.add(data, cb);
    }else{
      cb("Captcha Failed!");
    }

  });
}

function formatDate(date){
  return dateFormat(parseInt(date), "mmmm dS, yyyy, h:MM TT");
}

exports.get = get;
exports.post = post;
