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
		//need to validate form info...also a placeholder pic in event user doesnt uploaded one
		//model: error if not correct, success message if form saved
		//clear form on success
		var newEvent = new EventClass();

		var fileUploadControl = $('#event-photo')[0];
		if (fileUploadControl.files.length > 0) {
		  	var file = fileUploadControl.files[0];
		  	var name = 'photo.jpg';
		 
		  	var parseFile = new Parse.File(name, file);
		}

		parseFile.save().then(function() {
		  console.log('Youre awesome pic has been saved');
		}, function(error) {
		  console.log('Oops! Couldnt save your photo');
		});

		newEvent.set('eventPhoto', parseFile); //Put this in first function in save and placeholder in second function?
        newEvent.set('eventName', $('#event-name').val());
        newEvent.set('eventDescription', $('#event-description').val());
        newEvent.set('eventDate', $('#event-date').val());
        newEvent.set('eventStart', $('#start-event').val());
        newEvent.set('eventEnd', $('#end-event').val());
        newEvent.set('volunteersNeeded', $('#volunteers-needed').val());
        newEvent.set('eventSponsor', $('#event-sponsor').val());
        newEvent.set('email', $('#sponsor-email').val());
        newEvent.set('eventLocation', $('#event-city').val() + ', ' + $('#event-state').val());
        //set address? and/or lat and long for map and directions
        
        newEvent.save();

		router.events.add(newEvent);
	}
});