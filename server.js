let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let db = require('./dbcon.js');

let app = express();
let port = process.argv[2] || 5454;

const hbs = handlebars.create({
  defaultLayout:'main',
  helpers: {
    ifequ: function (a, b, options) {
      if (a == b) { return options.fn(this); }
      return options.inverse(this);
    }
  }
});

// Informs express that our static pages and assets
// are stored in the public directory
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', port);
app.set('db', db);
app.use('/', require('./routes/index')); // mount the index router

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

let server = app.listen(port, () => {
    console.log('== Express started on http://access.engr.oregonstate.edu:' + port);
    console.log('== press Ctrl-C to terminate.');
});
