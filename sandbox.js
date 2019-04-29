var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var testData = require('./testData.json');

// Used to set a directory to display any static assets like
// style sheets and images. In this case the public dir.
app.use(express.static('public'));
// Sets view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// Sets port as a command line argument
app.set('port', process.argv[2]);

app.get('/',function(req,res,next){
    //let context = {};
    let context = testData;
		res.render('home',context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
