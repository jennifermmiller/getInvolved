//Display for getHelp page:
var EventView = Backbone.View.extend({

	createTemplate: _.template($('#event-template').text()),

	events:{
		'click #volunteer': 'signUp'
	},

	initialize: function(){
		$('body').append(this.el);
		this.render();
		console.log(this.model.id);
	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	},

	signUp: function(){
		new SignupView();
	}
});



//Display for Singup modal:
var SignupView = Backbone.View.extend({

	createTemplate: _.template($('#signup-template').text()),

	initialize: function(){
		$('body').append(this.el);

		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});