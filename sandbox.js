let express = require('express');
let os = require('os');

let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let host = os.hostname();


// Used to set a directory to display any static assets like
// style sheets and images. In this case the public dir.
app.use(express.static('public'));
// Sets view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// Sets port as a command line argument
app.set('port', process.argv[2]);

app.get('/',function(req,res,next){
    let context = {};
		res.render('home',context);
});

app.get('/characters',function(req,res,next){
    let context = {};
		res.render('characters',context);
});

app.get('/classes',function(req,res,next){
    let context = {};
		res.render('classes',context);
});

app.get('/races',function(req,res,next){
    let context = {};
		res.render('races',context);
});

app.get('/features',function(req,res,next){
    let context = {};
		res.render('features',context);
});

app.get('/skills',function(req,res,next){
    let context = {};
		res.render('skills',context);
});

app.get('/character_classes',function(req,res,next){
    let context = {};
		res.render('character_classes',context);
});

app.get('/character_skills',function(req,res,next){
    let context = {};
		res.render('character_skills',context);
});

app.get('/class_features',function(req,res,next){
    let context = {};
		res.render('class_features',context);
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

let server = app.listen(app.get('port'), function(){
    let port = server.address().port;
    let host = server.address().address;
    console.log('== Express started on http://' + host + ':' + port);
    console.log('== press Ctrl-C to terminate.');
});
