//Display for helpOut page:
var HelpOutView = Backbone.View.extend({

	createTemplate: _.template($('#help-out-template').text()),

	className: 'help-out-view',

	//Fix this so only one search option at a time shows up
	events:{
		'click .search-options': 'showSearch',
		'click #search-btn' : 'search'
	},

	initialize: function(){
		$('body').append(this.el);

		var query = new Parse.Query("EventClass");
		query.descending("createdAt");

		query.find({
			success: function(events){
				_.each(events, function(event){
					new ThumbnailView({model: event});
				});
			}
		});

		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	},

	showSearch: function(){
		$('.expand-search').show();
	},

	search: function(){
		//Need to figure something out with this
		
		//city is working
		if ($('#desired-location').val() !== ''){
			var city = $('#desired-location').val().toLowerCase();
			var link = '#/helpOut/' + city;

			this.$el.find('#search-btn').attr('href', link);
			$('#desired-location').val('');
		}

		//date is working
		if ($('#desired-date').val() !== '') {
			var date = $('#desired-date').val();
			var link = '#/helpOut/' + date;

			this.$el.find('#search-btn').attr('href', link);
			$('#desired-date').val('');
		}

		//Amount of time...not working:(
		var amtOfTime= $('#desired-time').val();
		var link = '#/helpOut/' + amtOfTime;
		console.log(amtOfTime, link);
	}
});
