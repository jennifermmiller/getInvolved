//Displays events as thumbnails
var ThumbnailView = Backbone.View.extend({
	tagName: 'a',

	className: 'thumbnail-css',

	createTemplate: _.template($('#thumbnail-template').text()),

	initialize: function(){
		$('.upcoming').append(this.el);

		this.setHrefAttr();
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	},

	setHrefAttr: function(){
		//var id = this.model.get()
	}
});