//Display for getHelp page:
var GetHelpView = Backbone.View.extend({

	createTemplate: _.template($('#get-help-template').text()),

	events:{
		'click #submit-help-form' : 'submit'
	},

	initialize: function(){
		$('body').append(this.el);
		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	},

	submit:function(){
		//need to validate form info
		//model: error if not correct, success message if form saved
		//clear form on success
		var newEvent = new EventClass();

		newEvent.save({
			organization: $('#org-name').val(),
			description: $('#org-description').val(),
			email: $('#org-email').val(),
			eventDate: $('#event-date').val(),
			eventStart: $('#start-event').val(),
			eventEnd: $('#end-event').val(),
		});

		var fileUploadControl = $('#org-photo')[0];	
		
		if (fileUploadControl.files.length > 0) {
		  var file = fileUploadControl.files[0];
		  var name = 'photo.jpg';
		 
		  var parseFile = new Parse.File(name, file);
		}

		parseFile.save().then(function() {
			event.set("eventPhoto", parseFile);
		  	console.log("Yay! Your photo has been saved!");
		});

		router.events.add(newEvent);
	}
});