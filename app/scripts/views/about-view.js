//Display for About page:
var AboutView = Backbone.View.extend({

	createTemplate: _.template($('#about-template').text()),

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});