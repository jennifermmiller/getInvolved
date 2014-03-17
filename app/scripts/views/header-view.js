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


//Display footer on page:
var FooterView = Backbone.View.extend({
	tagName: 'footer',

	createTemplate: _.template($('#footer-template').text()),

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});


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


//Display for getHelp page:
var GetHelpView = Backbone.View.extend({
	tagName: '',

	createTemplate: _.template($('#get-help-template').text()),

	events:{

	},

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});