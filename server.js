var express = require('express'),
    exphbs = require('express-handlebars'),
    routes = require('./routes'),
    bodyParser = require('body-parser');

var app = express();

var hbs = exphbs.create({
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
app.use('/public', express.static('assets'));

app.listen(3000, '127.0.0.1');
