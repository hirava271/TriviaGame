var express = require('express'),
    http = require('http'),
    parser = require("body-parser"),
    movieDB = require('./modules/triviaDB'),
    app;

//create our Express powered HTTP server
app = express();

app.use(express.static(__dirname + '/client'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('This is the root route');
});

app.get('/question', function(req, res) {
    
});

app.post('/question', function(req, res){

    var question = req.body("question");
    console.log(question);

}


app.listen(3000, function() {
    console.log('server is listening on port 3000');
});