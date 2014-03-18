//Display for getHelp page:
var EventView = Backbone.View.extend({

	createTemplate: _.template($('#event-template').text()),

	// events:{
	// 	'click ': ''
	// },

	initialize: function(){
		$('body').append(this.el);
		this.render();
		console.log(this.model.id);
	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	}
});
