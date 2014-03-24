//Display for comments:
var CommentView = Backbone.View.extend({
	tagName: 'li',

	createTemplate: _.template($('#comment-template').text()),

	initialize: function(){
		$('.prev-comments').prepend(this.el);

		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});