//Display footer on page:
var FooterView = Backbone.View.extend({
	tagName: 'footer',

	className: 'footer',

	createTemplate: _.template($('#footer-template').text()),

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});