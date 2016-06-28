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

function post(body, callback){
  captcha.verify(body['captcha'], function(success){
    // DEBUGGING so I don't have to keep solving those damn puzzles
    success = true;
    if(success){
      // TODO: add it to database
    }
    body['success'] = success;
    console.dir(body);
    body['date'] = formatDate(body['date']);
    callback(body);
  });
}

function formatDate(date){
  return dateFormat(parseInt(date), "mmmm dS, yyyy, h:MM TT");
}

exports.get = get;
exports.post = post;
