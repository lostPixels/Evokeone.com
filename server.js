var express = require('express'),
    exphbs = require('express-handlebars'),
    routes = require('./routes'),
    handlebars = require('handlebars'),
    help = require('handlebars-form-helpers'),
    bodyParser = require('body-parser');

// THIS WAS NOT STRAIGHTFORWARD AT ALL
help.register(handlebars);

var app = express();

var hbs = exphbs.create({
	helpers: help.helpers,
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
app.use('/public', express.static('assets'));

app.listen(3000, '127.0.0.1');
