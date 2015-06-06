var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public',express.static('assets'));

app.get('/', function (req, res) {
    res.render('home',{wrapperClass:'home'});
});

app.get('/exhibits', function (req, res) {
    res.render('exhibits-list',{wrapperClass:'exhibits'});
});

app.get('/exhibit/:exhibitID', function (req, res) {
    res.render('exhibit',{wrapperClass:'exhibit',exhibitID:req.params.exhibitID});
});
app.get('/history', function (req, res) {
    res.render('history',{wrapperClass:'history'});
});
app.get('/archive', function (req, res) {
    res.render('archive',{wrapperClass:'archive'});
});
app.get('/submission/:submissionID', function (req, res) {
    res.render('single-art',{wrapperClass:'single-art'});
});

app.listen(3000);