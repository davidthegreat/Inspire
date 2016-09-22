// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap.min
$(document).ready(function(){
	eventListeners();
}); // end of doc ready

var eventListeners = function(){
	sendForm();
}

var sendForm = function() {
	$('.quote-form').on('submit', function(e){
		e.preventDefault();
		var input = $('#submitted-quote').val();
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
			console.log(response);
			$('#user-quote').toggle();
			$('.new-graph').html("<canvas id='can' width='200' height='200' />")
			console.log("canvas added to page");
			var canvas = document.getElementById("can");
			console.log(canvas);
			console.log("canvas confirmed added and selected")
			var ctx = canvas.getContext("2d");
			var lastend = 0;
			var canvasData = JSON.parse(response);
			// console.log(canvasData);
			var score = canvasData['score'];
			// console.log(score)
			var scoreDifference = 1 - canvasData['score'];
			var data = [score, scoreDifference]; // more values means add more colors to myColor
			var myTotal = 0; // Automatically calculated
			var myColor = ['blue', 'white']; // Colors of each slice
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
		})
	})
}

// we originally didn't have time to get the core functionality linked up using AJAX, so we had hard-coded some graphs we'd pre-made
// Another route would be to not use AJAX and load a cloned page on a new route with the actual script for drawing the canvas
// graph running as soon as the doc loads, but even that is far from the intended idea functionality, but this worked for presenting our idea.

// var sendForm = function(){
// 	$('.quote-form').on('submit', function(event){
// 	event.preventDefault();
// 		var input = $('#submitted-quote').val();
// 		var data = $(this).serialize();
// 		$.ajax({
// 			url: 'https://watson-api-explorer.mybluemix.net/alchemy-api/calls/html/HTMLGetTextSentiment',
// 			type: 'POST',
// 			formData: {
// 				html: data,
// 				apikey: '',
// 				outputMode: 'JSON' }
// 		}).done(function(response){  
// 			var photoLinks = ['http://i.imgur.com/PDpXKn2.png', 'http://i.imgur.com/wQPNc3w.png', 'http://i.imgur.com/fDZmMSd.png', 'http://i.imgur.com/LW8ALXj.png', 'http://i.imgur.com/Pq9k8nv.png', 'http://i.imgur.com/K5Ayac8.png', 'http://i.imgur.com/1izp2hi.png', 'http://i.imgur.com/PDpXKn2.png' ]
// 			var rand = photoLinks[Math.floor(Math.random() * photoLinks.length)];
// 			$('<img class="img-responsive img-thumbnail img-circle" width="125" height="125" src="' + rand + ' "/> ').appendTo('.new-graph');
// 			$('.quote-form').hide();
// 			$('.new-quote').append('"' + input + '"')
// 			$('.result').css("display", "inline-block")
// 		})
// 	})
// }