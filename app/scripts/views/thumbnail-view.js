//Displays events as thumbnails
var ThumbnailView = Backbone.View.extend({
	tagName: 'a',

	className: 'thumbnail-css',

	createTemplate: _.template($('#thumbnail-template').text()),

	//Thinking this will need to be changed in order to put thumbnails elsewhere in project
	//Unless, use same class name in different templates?
	initialize: function(){
		$('.upcoming').append(this.el);

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