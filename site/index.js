var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/download', function(req, res){
    
    var fileName = req.query.name;    
    var filePath = path.join(__dirname, '/uploads/' + fileName);
    
    res.download(filePath, fileName);
});
app.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

io.on('connection', function(socket){
  console.log(socket.id + ' user connected');
    io.emit('chat message', socket.id + ' user connected');
    
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', socket.id + ': ' + msg);
    });
    socket.on('file message', function(file){
        io.emit('chat message', socket.id + ': ');
        io.emit('file message', file);
    });
    socket.on('data file', function(data){
       console.log('file data: ' + data); 
    });
    socket.on('disconnect', function(){
        io.emit('chat message', socket.id + ' user disconnected');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
})
