let express = require('express');
let os = require('os');

let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let host = os.hostname();

// for testing only, will be replced by data from queries
let characterData = [
    {name: 'Ruth'},
    {name: 'Jim'}
];

// Used to set a directory to display any static assets like
// style sheets and images. In this case the public dir.
app.use(express.static('public'));
// Sets view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// Sets port as a command line argument
app.set('port', process.argv[2]);

app.get('/',function(req,res,next){
		res.status(200).render('home',{});
});

app.get('/characters',function(req,res,next){
		res.status(200).render('characters',{
        characterData: characterData
    });
});

app.get('/classes',function(req,res,next){
		res.status(200).render('classes',{});
});

app.get('/races',function(req,res,next){
		res.status(200).render('races',{});
});

app.get('/features',function(req,res,next){
		res.status(200).render('features',{});
});

app.get('/skills',function(req,res,next){
		res.status(200).render('skills',{});
});

app.get('/character_classes',function(req,res,next){
		res.status(200).render('character_classes',{});
});

app.get('/character_skills',function(req,res,next){
		res.status(200).render('character_skills',{});
});

app.get('/class_features',function(req,res,next){
		res.status(200).render('class_features',{});
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
