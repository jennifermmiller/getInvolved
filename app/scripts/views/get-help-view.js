//Display for getHelp page:
var GetHelpView = Backbone.View.extend({
	
	className: 'get-help',

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

		//if($('#event-photo').val() !== []){
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
		// } else {

		// }

		newEvent.set('eventPhoto', parseFile);
        newEvent.set('eventName', $('#event-name').val());
        newEvent.set('eventDescription', $('#event-description').val());
        newEvent.set('eventDate', $('#event-date').val());
        newEvent.set('eventStart', $('#start-event').val());
        newEvent.set('eventEnd', $('#end-event').val());
        newEvent.set('volunteersNeeded', $('#volunteers-needed').val());
        newEvent.set('eventSponsor', $('#event-sponsor').val());
        newEvent.set('email', $('#sponsor-email').val());
  
		var geocoder = new google.maps.Geocoder();
		var address = $('#event-address').val();
		
		//If time, slice out state and add to cityDisplay for thumbnail?
		// String getState = $('#event-address').val();
		// String[] parts = getState.split(",");
		// String state = parts[2];

		geocoder.geocode({'address': address}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				var city = results[0].address_components[2].long_name.toLowerCase();
				var cityDisplay = results[0].address_components[2].long_name;
				var longitude= results[0].geometry.location.lng();
				var latitude = results[0].geometry.location.lat();

				console.log(latitude, longitude, city, cityDisplay);

				newEvent.set('longitude', longitude);
				newEvent.set('latitude', latitude);
				newEvent.set('city', city); //To search by city
				newEvent.set('eventLocation', cityDisplay); //city, (State - maybe) for thubnail
			} else {
				console.log('The Google gods frown upon you!' + status);
			}
		});

        newEvent.save();

		router.events.add(newEvent);
	}
});