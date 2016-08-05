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


var sendForm = function(){
	$('.quote-form').on('submit', function(event){
	event.preventDefault();
		var input = $('#submitted-quote').val();
		var data = $(this).serialize();
		$.ajax({
			url: 'https://watson-api-explorer.mybluemix.net/alchemy-api/calls/html/HTMLGetTextSentiment',
			type: 'POST',
			formData: {
				html: data,
				apikey: '',
				outputMode: 'JSON' }
		}).done(function(response){
			// var photoID = Math.floor(Math.random() * 7) + 1  
			var photoLinks = ['http://i.imgur.com/PDpXKn2.png', 'http://i.imgur.com/wQPNc3w.png', 'http://i.imgur.com/fDZmMSd.png', 'http://i.imgur.com/LW8ALXj.png', 'http://i.imgur.com/Pq9k8nv.png', 'http://i.imgur.com/K5Ayac8.png', 'http://i.imgur.com/1izp2hi.png', 'http://i.imgur.com/PDpXKn2.png' ]
			var rand = photoLinks[Math.floor(Math.random() * photoLinks.length)];
			$('<img class="img-responsive img-thumbnail img-circle" width="125" height="125" src="' + rand + ' "/> ').appendTo('.new-graph');
			$('.quote-form').hide();
			$('.new-quote').append('"' + input + '"')
			$('.result').css("display", "inline-block")
			// $('.new-quote').css('display: inline-block;')
			// $('.right-arrow').css('display: inline-block;')
			// $('.new-graph').css('display: inline-block;')

		})
	})
} // end of sendForm