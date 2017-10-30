var express = require('express');
var bodyParser = require('body-parser');

var port = 8080;

var app = express();
// end dependencies

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars/method-override
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set method-override
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
// ========END OF DEPENDENCIES=======

// Import routes and give the server access to them.
var routes = require('./controllers/burger_controller.js');

app.use('/', routes);

//========listens for server=========
app.listen(port, function() {
  console.log('Listening on PORT ' + port);
});
