var express = require('express'),
    http = require('http'),
    parser = require("body-parser"),
    movieDB = require('./modules/triviaDB'),
	MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    ObjectId = require('mongodb').ObjectID,
    app;

    app = express();

	app.engine('.html', require('ejs').__express);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');

var jsonParser = parser.json({
    type: 'application/json'
});
var router = express.Router();

app.use(parser.urlencoded({
    extended: true
}));
app.use(parser.json());

var url = 'mongodb://localhost:27017/triviaGame';

app.get('/question', function(req, res) {

	console.log("I  am inside get question");

    var findQuestions = function(db, callback) {

        var data = db.collection('questionTable').find().toArray(function(err, documents) {
            res.send(documents);
            db.close();
        });
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findQuestions(db, function() {});
    });
});

app.post('/question', function(req, res) {

    var question = req.body["question"];
    var answer = req.body["answer"];
    var data = req.body;

    console.log("I am inside post function...........");
    console.log(question);
    console.log(answer);
    
    var insertDocument = function(db, callback) {

    	db.collection('questionTable').insert({
    		"question" : question,
    		"answer" : answer
    	});

    	var findQuestion = function(db, callback) {

        	var data = db.collection('questionTable').find().toArray(function(err, documents) {
            	res.send(documents);
            	db.close();
        	});
    	};
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });

});

require('./routes/index')(app);

app.listen(3000, function() {
    console.log('server is listening on port 3000');
});