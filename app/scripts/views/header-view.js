//Display header on page:
var HeaderView = Backbone.View.extend({
	tagName: 'header',

	createTemplate: _.template($('#header-template').text()),

	initialize: function(){
		$('body').prepend(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}	
});