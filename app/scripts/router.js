var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'about': 'aboutPage',
		'getHelp': 'getHelpPage',
		'helpOut': 'helpOutPage',
		'helpOut/:sort': 'sortEvents',
		'helpOut/events/:eventId': 'eventDetails'
	},

	initialize: function() {
		this.events = new EventsCollection();
		this.comments = new CommentsCollection();
	},

	home: function() {
		$('body').empty();
		
		new HeaderView();
		new HomeView();

		var query = new Parse.Query(EventClass);
		query.limit(3);
		query.ascending('eventDate');
		query.find({
			success: function(events){
				//Clean this up so not using for loop?
				for(var i=0; i < events.length; i++){
					new ThumbnailView({model: events[i]});
				}
				new FooterView();
			},
			error: function(){
				console.log('not so fast!');
			}
		});
	},

	aboutPage: function() {
		$('body').empty();
		new HeaderView();
		new AboutView();
		new FooterView();
	},

	getHelpPage: function() {
		$('body').empty();
		new HeaderView();
		new GetHelpView();
		new FooterView();
	},

	helpOutPage: function(sort) {
		$('body').empty();
		new HeaderView();
		new HelpOutView();
		new FooterView();
	},

	eventDetails: function(eventId){
		$('body').empty();
		new HeaderView();

		var query = new Parse.Query(EventClass);
		query.equalTo("objectId", eventId);
		query.find({
			success: function(result){
				new EventView({model: result});
				new FooterView();
			},error: function(){
				console.log('sucking hard!')
			}
		});
		
	}



});


