//Things to be fixed down the road:
	//would like to have {pushState: true} working (vs hashtags)
	//add to about page (see comment above template)
	//Add type to event form (need to find a database)
	//Geolocate option for get help location? practical? Or...autopopulate town and state on input of zip. Also, list of states vs typing it in?
	//Have past event stay up for a week or something?
		//Maybe have upcoming events and past events for people to connect post event?
	//Look into Bootstrap form validation error ... adds/removes warning class 
console.log('yo!');

$(document).ready(function(){
Parse.initialize("BVqqHnDg3xhdBezKMQFxvzdjHx98lJDRJxjCJy9H", "9HXAYhUbtdZsRREtIp9K7YChpvAFAeWsTBZAYkPt");

window.router = new Router();

Backbone.history.start();



});