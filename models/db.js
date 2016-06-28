const
  q = require('q'),
  CouchDB = require('node-couchdb'),
  couch = new CouchDB({
  auth: {
  // SET THIS CORRECTLY!
      user: 'evoke',
      pass: 'vkdoer591'
  }}),
  viewPrefix = "_design/evoke/_view/",
  dbName = "evoke-memories",
  ddoc = {
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

var sampleMemories = [
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

function list(view, callback){
  console.log(viewPrefix + view);
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

function add(memory, callback){

}

/*

  Not implemented

*/
function del(callback){

}

// PROCEDURE:
// 0. SET USERNAME AND PASSWORD --> not implemented
// 1. DROP DB
// 2. ADD DB
// 3. UPLOAD DESIGN DOC
// 4. put sample files (not in final release)

// TODO: redo this with Q library
function init(callback){

    couch.dropDatabase(dbName)
         .then(function() { return couch.createDatabase(dbName); })
         .then(function() { return couch.insert(dbName, ddoc); } )
         .then(function() { return couch.uniqid(); })
         .then(function(id){
           console.dir(id);
           return couch.insert(dbName, {
               _id: id[0],
               name: 'Testing 1337',
               date: 'June 23, 2016',
               comments: 'Yo yo yo couchDB in the hizzy.'
           });
         })
        .then(function(response){
          console.log(response.data);
          callback(response);
        })
        .catch(function(err){
          console.log(err);
          callback(err);
        });
}

exports.list = list;
exports.add = add;
exports.init = init;
