let express = require('express');
let handlebars = require('express-handlebars');
let index = require('./routes/index.js');

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
})

app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', port);

// mounts a router that handles site paths
app.use('/', index); // mount the index router

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

let server = app.listen(app.get('port'), function(){
    let port = server.address().port;
    let host = server.address().address;
    console.log('== Express started on http://' + host + ':' + port);
    console.log('== press Ctrl-C to terminate.');
});
