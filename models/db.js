// set to false if production mode
var loadSample = true;

// set to false if in production mode
// IMPORTANT: setting this to true
// means that someone can clear the memories list
// by going to /db/init
var developmentMode = true;

// user and password info for database
var dbLogin = {
  user: 'evoke',
};

// database name
var dbName = "evoke-memories";

// prefix for views in this database
var viewPrefix = "_design/evoke/_view/";

// design doc for database
var ddoc = {
  _id: '_design/evoke',
  rewrites: [
    { from: '_db',     to: '../..' },
    { from: '_db/*',   to: '../../*' },
    { from: '_ddoc',   to: '' },
    { from: '_ddoc/*', to: '*' },
    { from: '/',       to: 'index.html' },
    { from: '/*',      to: '*' }
  ],
  // can add more views here if we ever need them
  views: {
    memories: {
      map : 'function(doc){emit(doc.date, null); }'
    }
  },
  shows: {},
  lists: {}
};

// sample db content
// could load from file
// but fuck that
var sampleContent = [
  {
      title:'I love Evoke',
      name:'James',
      date: '1490425200000',
      comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
  },
  {
      title: 'Evoke rocks!',
      name:'Ted',
      date: '1489561200000',
      comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
  },
  {
      title: 'GG NOOBS',
      name:'DepthCore',
      date: '1489993200000',
      comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
  }
];

const
  Q = require('q'),
  CouchDB = require('node-couchdb'),
  couch = new CouchDB({
  auth: dbLogin
});

function list(view, callback){
  couch.get(dbName, viewPrefix + view)
    .then(
      function(data, headers, status){
        listToDocs(data.data.rows, callback);
      },
      function(err){
        console.log(err);
        callback([]);
      }
    );
}

/*

  Iterates over a list of rows returned by CouchDB.
  Calls callback function when all rows are done being requested from dB.

*/
function listToDocs(rows, callback){
  var docs = [];
  rows.forEach(function(row){
    couch.get(dbName, row.id)
        .then(function(data, headers, status){
          docs.push(data.data);
          if(docs.length == rows.length){
            callback(docs);
          }
        },function(err){
          console.log(err);
          // this is a questionable move
          docs.append({});
      });
  });
}

function add(item, callback){
  couch.uniqid()
    .then(function(id){
      item['_id'] = id[0];
      return couch.insert(dbName, item);
    })
    .then(function(data, headers, status){
      callback(data);
    })
    .catch(
      function(err){
        console.log(err);
        callback(err);
      });
}

/*

  Not implemented

*/
function del(callback){

}

// TODO: redo this with Q library
function init(callback){
    // delete old database
    if(developmentMode){
      couch.dropDatabase(dbName)
         // create databse
         .then(function() { return couch.createDatabase(dbName); })
         // upload design document
         .then(function() { return couch.insert(dbName, ddoc); } )
         // load sample content
         .then(function() { return loadSampleContent(); })
         // callback
         .then(function(){
           // to avoid accidentally clearing the db
           loadSample = false;
           developmentMode = false;
           callback("Success! Production mode enabled now.");
         })
         .catch(function(err){
           console.log(err);
           callback(err);
        });
    }else{
      callback("Production mode active. Not initializing database.");
    }
}

/*
  LOADS SAMPLE CONTENT
  Or does nothing if in production mode
*/
function loadSampleContent(){
  if(loadSample){
    // init to dummy promise
    var promises = Array();
    sampleContent.forEach(function(sample){
      var deferred = Q.defer();
      add(sample, function(result){
        deferred.resolve(result);
      });
      promises.push(deferred);
    });
    return Q.allSettled(promises);
  }else{
    // does nothing if we're in production mode
    return Q.fcall(function(){});
  }
}

exports.list = list;
exports.add = add;
exports.init = init;
