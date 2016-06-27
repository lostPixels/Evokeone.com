var express = require('express'),
  bodyParser = require('body-parser');
var exhibitModel = require('./models/exhibits');
var artworkModel = require('./models/artwork');
var memoryModel = require('./models/memories');
var router = express.Router();
var parser = bodyParser.urlencoded({extended: true});

router.param('exhibitID', function(req, res, next, id) {
  req.exhibit = {
    id: id
  };
  next();
});


router.param('submissionID', function(req, res, next, id) {
  req.submission = {
    id: id
  };
  next();
});


router.get('/', function(req, res) {
    res.render('home', {
        wrapperClass: 'home'
    });
});

/** Removing until we add all the art packs.
app.get('/exhibit/', function(req, res) {
    res.render('exhibits-list', {
        wrapperClass: 'exhibits'
    });
});

app.get('/exhibits/:exhibitID', function(req, res) {
    res.render('exhibit', {
        wrapperClass: 'exhibit',
        exhibitID: req.params.exhibitID
    });
});
**/

router.get('/exhibits/forever', function(req, res) {
    var exhibitData = exhibitModel.get('forever');
    res.render('exhibit', {
        wrapperClass: 'exhibit',
        data: exhibitData
    });
});

router.get('/history', function(req, res) {
    res.render('history', {
        wrapperClass: 'history'
    });
});

router.get('/archive', function(req, res) {
    res.render('archive', {
        wrapperClass: 'archive'
    });
});


router.get('/submission/:exhibitID/:submissionID', function(req, res) {
    var artworkData = artworkModel.get(req.exhibit.id, req.submission.id);
    res.render('single-art', {
        wrapperClass: 'single-art',
        data: artworkData
    });
});

router.get('/memories', function(req, res) {
    var memoryList = memoryModel.get();
    res.render('memories', {
        wrapperClass: 'memories',
        memoryList: memoryList
    });
});

router.get('/memories/init', function(req, res) {
    resp = memoryModel.init();
    res.render('dbdebug', {
        wrapperClass: 'dbdebug',
        resp: resp
    });
});

router.post('/memories', parser, function(req, res) {
    // needed because of async Captcha Code
    memoryModel.post(req.body, function(response){
      res.json(response);
    });
});

module.exports = router;
