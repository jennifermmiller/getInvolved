//Things to be fixed down the road:
	//would like to have {pushState: true} working (vs hashtags)
	//add to about page (see comment above template)
	//Add type to event form (need to find a database for options)
	//Or...autopopulate town and state on input of zip? Also, list of states vs typing it in?
	//Have past event stay up for a week or something?
		//Maybe have upcoming events and past events for people to connect post event?
	//Look into Bootstrap form validation... add/remove warning class
	//Fix how comments look, thinking fixed height div where comments are appended and add comment beneath that or at least beneath title?
console.log('yo!');

$(document).ready(function(){
Parse.initialize("BVqqHnDg3xhdBezKMQFxvzdjHx98lJDRJxjCJy9H", "9HXAYhUbtdZsRREtIp9K7YChpvAFAeWsTBZAYkPt");

window.router = new Router();

Backbone.history.start();

});



function removeOldEvents(){
	var m = moment();

}