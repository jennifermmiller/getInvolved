//Display for Homepage contents:
var HomeView = Backbone.View.extend({
	className: 'homepage-guts',

	createTemplate: _.template($('#home-template').text()),

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});