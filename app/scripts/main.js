$(document).ready(function(){
	Parse.initialize("BVqqHnDg3xhdBezKMQFxvzdjHx98lJDRJxjCJy9H", "9HXAYhUbtdZsRREtIp9K7YChpvAFAeWsTBZAYkPt");

	window.router = new Router();

	Backbone.history.start();
});

//Form validation for get help:
$(function(){
    $('#event-details').validate({
        rules: {
            "event-name" : {
            	required: true,
            	minlength: 2,
            	maxlength: 32
            },
            "event-address" : "required",
            "event-date": {
                required: true,
               // range: [today - on] somehow no put in previous dates??
            },
            "start-event": {
            	required: true,
            	date: true
            },
            "event-duration": {
            	range: [1,12],
                required: true
            },
            "event-description": "required",
            "event-sponsor": {
            	required: true,
            	minlength: 2
            },
            "sponsor-email": {
            	required: true,
            	email: true
            },
            "event-pledge": "required",
            "needed-vols": {
            	range: [1, 100],
                required: true
            },
            "event-category": "required",
            "event-photo": "required" //maybe not, need to find good generic photo
        },
        //Maybe work on specific messages if time
        messages: {
           	"event-name": "Please enter name of event.",
            "event-address": "Please enter the event's location.",
            "event-date": "Please enter when this event will occur.",
            "event-start": "Please enter when this event will start.",
            "event-duration": {
            	required: "Please enter how long you think this event will run.",
            	range: "Must be at least one hour."
            },
            "event-description": "Please enter a brief description of this event.",
            "event-sponsor": "Please enter this event's sponsor.",
            "sponsor-email": "Please enter sponsor's email",
            "needed-vols":{
            	required: "Please enter how many volunteers will you need.",
            	range: "Must need atleast one volunteer."
            }


        },
        errorContainer: $('#errorContainer'),
        errorLabelContainer: $('#errorContainer ul'),
        wrapper: 'li'
    });
});

function validateNumbers(){
	//Need validate doesnt seem to work for things other than text
}



//Things to be fixed down the road
	//add to about page (see comment above template)
	//Add type to event form (need to find a database for options)
	//Have past event stay up for a week or something?
		//Maybe have upcoming events and past events for people to connect post event?
	//Look into Bootstrap form validation... add/remove warning class
	//Stage 2:  logins, comments w/ reply option