$(document).ready(function(){
  eventListeners();
}); // end of doc ready

var eventListeners = function(){
  sendForm();
}

var canvasDraw = function(response) {
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  var lastend = 0;
  var canvasData = response['docSentiment']
  var score = Math.floor(canvasData['score'] * 100);
  var scoreDifference = Math.floor(100 - score);
  var data = [score, scoreDifference]; // more values means add more colors to myColor
  console.log(data)
  var myTotal = 0; // Automatically calculated
  var myColor = ['#F2B02B', 'white']; // Colors of each slice
  for (var e = 0; e < data.length; e++) {
    myTotal += data[e];
  }
  for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    lastend += Math.PI * 2 * (data[i] / myTotal);
    ctx.font = "20px Helvetica";
    ctx.fillText(score + "%", 25, 90);
  }
}

var sendForm = function() {
  $('.quote-form').on('submit', function(e){
    e.preventDefault();
    var input = $('#submitted-quote').val();
    var formatted_input = input.replace("quote=","").replace("%20","")
    var data = $(this).serialize();
    console.log(data)
    $.ajax({
      url: '/alchemy',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: 'POST',
      data: data,
      contentType: 'json',
      dataType: 'json'
    }).done(function(response) {
      $('#user-quote').empty()
      $('#user-quote').html("<div class='col-md-4' id='new-quote'></div><div class='col-md-4' id='right-arrow'></div><div class='col-md-4'><canvas id='can' width='125' height='125' /></div>")
      canvasDraw(response);
    })
  })
}

// we originally didn't have time to get the core functionality linked up using AJAX, so we had hard-coded some graphs we'd pre-made
// Another route would be to not use AJAX and load a cloned page on a new route with the actual script for drawing the canvas
// graph running as soon as the doc loads, but even that is far from the intended idea functionality, but this worked for presenting our idea.

// var sendForm = function(){
//  $('.quote-form').on('submit', function(event){
//  event.preventDefault();
//    var input = $('#submitted-quote').val();
//    var data = $(this).serialize();
//    $.ajax({
//      url: 'https://watson-api-explorer.mybluemix.net/alchemy-api/calls/html/HTMLGetTextSentiment',
//      type: 'POST',
//      formData: {
//        html: data,
//        apikey: '',
//        outputMode: 'JSON' }
//    }).done(function(response){  
//      var photoLinks = ['http://i.imgur.com/PDpXKn2.png', 'http://i.imgur.com/wQPNc3w.png', 'http://i.imgur.com/fDZmMSd.png', 'http://i.imgur.com/LW8ALXj.png', 'http://i.imgur.com/Pq9k8nv.png', 'http://i.imgur.com/K5Ayac8.png', 'http://i.imgur.com/1izp2hi.png', 'http://i.imgur.com/PDpXKn2.png' ]
//      var rand = photoLinks[Math.floor(Math.random() * photoLinks.length)];
//      $('<img class="img-responsive img-thumbnail img-circle" width="125" height="125" src="' + rand + ' "/> ').appendTo('.new-graph');
//      $('.quote-form').hide();
//      $('.new-quote').append('"' + input + '"')
//      $('.result').css("display", "inline-block")
//    })
//  })
// }