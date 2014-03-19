//Models:
//Model for getHelp events:
var EventClass = Parse.Object.extend('EventClass');

//Model for getHelp event comments:
var CommentClass = Parse.Object.extend('CommentClass',{	
	defaults: {
		'commentBy' : 'Anonymous'
	}
});

//Model for volunteers:
var VolunteerClass = Parse.Object.extend('VolunteerClass');


//Collections:
//Collection for getHelp events:
var EventsCollection = Parse.Collection.extend({
	model: EventClass
});

//Collection for getHelp event comments:
var CommentsCollection = Parse.Collection.extend({
	model: CommentClass
});

//Collection for volunteer (so emails can be sent)
var VolunteersCollection = Parse.Collection.extend({
	model: VolunteerClass
});