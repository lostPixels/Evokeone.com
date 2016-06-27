const
    q = require('q'),
    CouchDB = require('node-couchdb'),
    couch = new CouchDB({
    auth: {
        user: 'evoke',
        pass: 'vkdoer591'
    }
});


function get(){
    return {
        memories:
                [
                    {
                        title:'I love Evoke',
                        name:'James',
                        date: 'march 1, 2017',
                        comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
                    },
                    {
                        title: 'Evoke rocks!',
                        name:'Ted',
                        date: 'march 1, 2017',
                        comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
                    },
                    {
                        title: 'GG NOOBS',
                        name:'DepthCore',
                        date: 'march 20, 2017',
                        comments:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt'
                    }
                ]
    };
}

/*

    TODO:
    1. INTEGRATE COUCHDB
    2. MAKE LAYOUT
    3. INTEGRATE CAPTCHA

*/

function save(){

}

// this is ugly as balls
// look into way to make this prettier

// install Q library :)
function init(){
    console.log("I GOT CALLED");
    couch.dropDatabase('evoke-memories').then(
        function(){
            console.log("DROPPED DATABASE");
            couch.createDatabase('evoke-memories').then(
                function(){
                    console.log("CREATED DATABASE");

                    // HERE IS WHERE IT BREAKS
                    couch.uniqid().then(
                        function(ids){
                            console.log("GOT ID " + ids[0]);
                            couch.insert("evoke-memories", {
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



exports.get = get;
exports.init = init;
