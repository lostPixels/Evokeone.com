var express = require('express'),
    exphbs = require('express-handlebars'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    // boolean operator helper
    extraHelpers = require('./util/handlebar-helper');

var app = express();

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers = extraHelpers.helpers()
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
app.use('/public', express.static('assets'));

app.listen(3000, '127.0.0.1');

checkVars();

function checkVars(){
  checkVars = ['DBPASS','DBUSER'];
  checkVars.forEach(function(v){
      if(!process.env[v]){
        console.error("WARNING: Variable " + v + " not set! Server may not work properly.");
      }
  });
}
