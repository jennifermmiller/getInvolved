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

		router.events.fetch({
			success: function(){
				router.events.each(function(event){
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
		//city
		if ($('#desired-location').val() !== ''){
			var city = $('#desired-location').val().toLowerCase();
			var link = '#/helpOut/' + city;

			this.$el.find('#search-btn').attr('href', link);
			$('#desired-location').val('');
		// } else if ($('#desired-date').val() !== '') {
		// 	var date = moment.($('#desired-date').val()).format("MMMDoYY");
		// 	var link = '#/helpOut/events/' + date;

		// 	this.$el.find('#search-btn').attr('href', link);
		// 	$('#desired-date').val('');
		// }



		// if ($('#desired-location').val() !== '') {
		// 	var city = $('#desired-location').val().toLowerCase();
		// 	this.$el.find('#search-btn').attr('href', '#/helpOut/events/' + city);

		// } else if ($('#desired-date').val() !== ''){
		// 	var date = $('#desired-date').val();
		// 	this.$el.find('#search-btn').attr('href', '#/helpOut/events/' + date);
		// } else	if($('#').val() !== '') {
		// 	//Need to decide how to search by time? <2hrs, 2-4hrs, >4hrs ?
		// }
		}
	}
});
