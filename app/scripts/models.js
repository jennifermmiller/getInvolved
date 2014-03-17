//Models:
//Model for getHelp events:
var EventClass = Parse.Object.extend('EventClass');

//Model for getHelp event comments:
var CommentClass = Parse.Object.extend('CommentClass');


//Collections:
//Collection for getHelp events:
var EventsCollection = Parse.Collection.extend({
	model: EventClass
});

//Collection for getHelp event comments:
var CommentsCollection = Parse.Collection.extend({
	model: CommentClass
});