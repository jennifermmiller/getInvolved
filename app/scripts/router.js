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
		this.volunteers = new VolunteersCollection();
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

		//Still need to add map for directions
		
		var that = this;
		this.events.fetch({
			success: function(){
				var eventInFocus = that.events.get(eventId)
				new EventView({model: eventInFocus});
				
				var query = new Parse.Query(CommentClass);
				query.equalTo('parent', eventInFocus);
				query.ascending('createdAt');
				query.find({
				  	success: function(comments) {
				  		$('#no-comments').hide(); //Somehow need to count repsonses and only hide if greater than 0?
				  		_.each(comments, function(comment){
				  			new CommentView({model: comment});
				  		});
				  	},
				  	error: function(){
				  		console.log('Sucking hard!')
				  	}
				});			
			},
			error: function(){
				console.log('Still sucking hard!') //Should probably turn this into a helpful comment!
			}
		});	 
	}



});


