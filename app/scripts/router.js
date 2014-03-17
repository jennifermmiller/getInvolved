var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'about': 'aboutPage',
		'getHelp': 'getHelpPage',
		'helpOut': 'helpOutPage',
		'helpOut/:search': 'sortEvents' //this will need to be fixed
	},

	initialize: function() {
		this.events = new EventsCollection();
		this.comments = new CommentsCollection();
	},

	home: function() {
		$('body').empty();
		new HeaderView();
		new HomeView();
		new FooterView();
	},

	aboutPage: function() {
		$('body').empty();
		new HeaderView();
		new AboutView();
		new FooterView();
	},

	getHelpPage: function() {
		$('body').empty();
		new HeaderView();
		new GetHelpView();
		new FooterView();
	},

	helpOutPage: function() {
		$('body').empty();
		new HeaderView();
		new FooterView();
	}



});