var express = require('express');
var exphbs  = require('express-handlebars');

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

app.get('/history', function (req, res) {
    res.render('history',{wrapperClass:'history'});
});


app.listen(3000);