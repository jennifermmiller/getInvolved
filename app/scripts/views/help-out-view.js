//Display for helpOut page:
var HelpOutView = Backbone.View.extend({

	createTemplate: _.template($('#help-out-template').text()),

	className: 'help-out-view',

	//Putting this in router? i think?
	// events:{
	// 	'click .search-btn' : 'search'
	// },

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
	}
});

