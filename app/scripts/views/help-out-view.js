//Display for helpOut page:
var HelpOutView = Backbone.View.extend({

	createTemplate: _.template($('#help-out-template').text()),

	//Putting this in router? i think?
	// events:{
	// 	'click .search-btn' : 'search'
	// },

	initialize: function(){
		$('body').append(this.el);

		//Instead of fetching all, query and seperate upcoming and past?
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
	}
});

//Working on dividing events:
// var now = moment();
// var query = new Parse.Query(EventClass);
// var 


