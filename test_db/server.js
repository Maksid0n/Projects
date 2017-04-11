var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db = require('./db');
var groupsController = require('./controllers/groups');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.get('/groups', groupsController.all);

app.get('/groups/:id', groupsController.findById);

app.post('/', groupsController.add);

app.put('/groups/:id', groupsController.update);

app.delete('/groups/:id', groupsController.delete);

db.connect('mongodb://localhost:27017/myapi', function(err) {
    if(err){
        return console.log(err);
    }
    
    app.listen(3000, function(){
    console.log('Server started on Port 3000');
    })
})

