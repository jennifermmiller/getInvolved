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

	helpOutPage: function() {
		$('body').empty();
		new HeaderView();
		new HelpOutView();
		new FooterView();
	},

	sortEvents: function(sort){
		//city:
		var query = new Parse.Query(EventClass);
		
		query.equalTo('city', sort);

		query.find({
			success: function(results){
				$('.opportunities').empty();
				
				//Fix title so it changes based on search?
				//$('#changing-header').val(sort + " volunteer opportunities").css("text-transform", "capitalize");
				
				if(results.length >0){
					for(var i=0; i < results.length; i++){
						new ThumbnailView({model: results[i]});
					}	
				} else {
					$('.opportunities').append('<h3 class="no-results">Sorry, no reults found.</h3>'); //Expand this...?
				}
			},
			error:function(){
				console.log('Bad Bad stuff!');
			}
		});
			

		//date:
		var	query = new Parse.Query(EventClass);
		
		query.equalTo('eventDate', sort);

		query.find({
			success: function(results){
				$('.opportunities').empty();
				
				//Fix title so it changes based on search?
				//$('#changing-header').val(sort + " volunteer opportunities").css("text-transform", "capitalize");
				
				if(results.length >0){
					for(var i=0; i < results.length; i++){
						new ThumbnailView({model: results[i]});
					}	
				} else {
					$('.opportunities').append('<h3 class="no-results">Sorry, no reults found.</h3>'); //Expand this...?
				}
			},
			error:function(){
				console.log('Bad Bad stuff!');
			}
		});

		//Amount of time: needs fixin
		var	query = new Parse.Query(EventClass);

		if (sort == 'all') {
			//display all options
		} else if (sort == '>6'){
			var timeframe = 7;
		} else if (sort == '4-6') {
			var timeframe = 6
		} else if (sort == '2-4') {
			var timeframe = 4
		} else if (sort == '<2') {
			var timeframe = 2
		}
		
		query.lessThan('eventDuration', timeframe);

		query.find({
			success: function(results){
				$('.opportunities').empty();
				
				//Fix title so it changes based on search?
				//$('#changing-header').val(sort + " volunteer opportunities").css("text-transform", "capitalize");
				
				if(results.length >0){
					for(var i=0; i < results.length; i++){
						new ThumbnailView({model: results[i]});
					}	
				} else {
					$('.opportunities').append('<h3 class="no-results">Sorry, no reults found.</h3>'); //Expand this...?
				}
			},
			error:function(){
				console.log('Bad Bad stuff!');
			}
		});

	},

	eventDetails: function(eventId){
		$('body').empty();
		new HeaderView();
		
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

				  		new FooterView();
				  	},
				  	error: function(){
				  		console.log('Cannot load comments.');
				  	}
				});			
			},
			error: function(){
				console.log('Cannot load event.');
			}
		});
	}
});


