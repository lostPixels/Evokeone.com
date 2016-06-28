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
        map : function(doc){
          emit(doc.date, null);
        }
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
function init(){
    console.log("I GOT CALLED");
    couch.dropDatabase('evoke-memories').then(
        function(){
            console.log("DROPPED DATABASE");
            couch.createDatabase(dbName).then(
                function(){
                    console.log("CREATED DATABASE");

                    // HERE IS WHERE IT BREAKS
                    couch.uniqid().then(
                        function(ids){
                            console.log("GOT ID " + ids[0]);
                            couch.insert(dbName, {
                                _id: ids[0],

                                name: 'Testing 1337',
                                date: 'June 23, 2016',
                                comments: 'Yo yo yo couchDB in the hizzy.'
                            }).then(
                                function(response){
                                    console.log("DATA: " + response.data + " STATUS " + response.status);
                                    return response;
                                },
                                function(err){
                                    console.log("JESUS CHRIST I GOT IN THIS FAR AND YOU STILL GAVE ME AN ERROR");
                                    console.log("FUCK YOU NODE. Here's the error: ");
                                    console.log(err);
                                }
                            )
                        },
                        function(err){
                            console.log("SOMETHING FUCKED UP");
                            console.log(err);
                        }
                    )
                },
                function(err){
                    console.log("Error creating database " + err);
                }
            )
        },
        function(err){
            console.log("Error dropping database " + err);
    });
}

exports.list = list;
exports.add = add;
exports.init = init;
