//Displays events as thumbnails and sets them as a-tags that link to more information
var ThumbnailView = Backbone.View.extend({
	tagName: 'a',

	className: 'thumbnails',

	createTemplate: _.template($('#thumbnail-template').text()),

	initialize: function(){
		$('.opportunities').append(this.el);

		this.setHrefAttr();
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	},

	setHrefAttr: function(){
		var eventId = this.model.id;
		var link  = '#/helpOut/events/' + eventId;
		this.$el.attr({href: link});
	}
});