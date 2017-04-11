var dropzone;
var fileName;
function setup(){    
    dropzone = select('#m');
    dropzone.drop(myMethod, unhighlight);
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
}

$('.upbutton').on('click', function (){
    $('#upload-input').click();
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){

    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

        formData.append('uploads[]', file, file.name);
        socket.emit('file message', file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          socket.emit('chat message', 'upload successful!');
      }
    });
  }
});

function myMethod(file){
    fileName = file.name;
    socket.emit('chat message', fileName);
    if(file.type != 'image'){
    socket.emit('data file', file.data);}
}

function highlight(){
    dropzone.style('background-color', '#ccc');
}

function unhighlight(){
    dropzone.style('background-color', '#fff');
}