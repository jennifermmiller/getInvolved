$(document).ready(function(){
	Parse.initialize("BVqqHnDg3xhdBezKMQFxvzdjHx98lJDRJxjCJy9H", "9HXAYhUbtdZsRREtIp9K7YChpvAFAeWsTBZAYkPt");

	window.router = new Router();

	Backbone.history.start();
});


//Things to be fixed down the road and stage 2 ideas: 
    //add to about page (see comment above template)
	//Look into Bootstrap form validation... add/remove warning class
    //Focus all inputs on hover...add enter
    //Add type to event form (need to find a database for options)
    //Right now, querying to hide past events, would like to have backround function that destroys out-dated models
	//logins, comments w/ reply option