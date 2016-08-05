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
		var data = $(this).serialize()
		$.ajax({
			url: 'https://watson-api-explorer.mybluemix.net/alchemy-api/calls/html/HTMLGetTextSentiment',
			type: 'POST',
			html: data,
			outputMode: 'JSON'
		}).done(function(response){
			console.log(response)
		})
	})
} // end of sendForm