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
  var data = [score, scoreDifference]; // more values => add more colors to myColor
  console.log(data)
  var myTotal = 0; // Automatically incremented below, take care changing
  var myColor = ['#F2B02B', 'white']; // These equate to the colors of each "slice"
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
      // extra divs for eventual styling
      canvasDraw(response);
    })
  })
}
