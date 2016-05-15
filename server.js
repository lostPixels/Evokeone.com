var express = require('express'),
    exphbs = require('express-handlebars'),
    routes = require('./routes'),
    bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(routes);
app.use('/public', express.static('assets'));

app.listen(3000);
