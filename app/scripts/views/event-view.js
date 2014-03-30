//Display for getHelp page:
var EventView = Backbone.View.extend({

	className: 'event-focus',

	createTemplate: _.template($('#event-template').text()),

	events:{
		'click #signup': 'signMeUp',
		'click #add-comment': 'addComment'
	},

	initialize: function(){
		$('body').append(this.el);
		this.render();
		
		console.log(this.model.id);

		var lat = this.model.get('latitude');
		var lng = this.model.get('longitude');
		var latlng = new google.maps.LatLng(lat, lng);

		var mapOptions = {
		    zoom: 16,
		    center: latlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var markerOptions = {
			position: new google.maps.LatLng(lat, lng)
		};

		var marker = new google.maps.Marker(markerOptions);
		marker.setMap(map);

	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	},

	signMeUp: function(){
		var volunteer = new VolunteerClass();

		var volunteerName = $('#volunteer-name').val();
		var volunteerEmail = $('#volunteer-email').val();
		var volunteerExtra = $('#volunteer-extra').val();


		//For now, this is extra...get back to this:
		// $('.modal-body').on('change', ':checkbox', function(){ 
		// 	if ($('#email-signup').is(':checked')){
		// 	   $('#volunteer-location').show();
		// 			var volunteerLocation = $('#volunteer-location').val();
		// 			volunteer.set('location', volunteerLocation);
		// 			console.log('here');
		// 	} else {
		// 	    $('#volunteer-location').hide();
		// 	}
		// });

		if (volunteerName !== '' && volunteerEmail !== '') {
			volunteer.set('name', volunteerName);
			volunteer.set('email', volunteerEmail);
			volunteer.set('extraInfo', volunteerExtra);
			volunteer.set('parent', this.model);
		
			router.volunteers.add(volunteer);

			volunteer.save(null, {
				success: function(result){
					//Success/error message...if success, model clear
					//Email confirmation to volunteer and event sponsor
					
					//Decrease volunteers needed by one...cloud function?
					
				},
				error: function(result,error) {
					console.log('Opps! ' + error + "just happened")
				}
			});

			$('#volunteer-name').val('');
			$('#volunteer-email').val('');
			$('#volunteer-extra').val('');
		}
	},

	addComment: function(){
		var commentText = $('#new-comment').val(); 

		if(commentText !== ''){
			var comment = new CommentClass();

			var timeStamp = moment().format('MMM Do YYYY, h:mm a');

			comment.set('commentContent', commentText);
			
			if ($('#comment-by').val() !== '') {
				var commentAuthor = $('#comment-by').val();
				comment.set('commentBy', commentAuthor);
			}

			comment.set('commentedAt', timeStamp);
			comment.set('parent', this.model);

			router.comments.add(comment);
			
			comment.save(null,{
				success: function(result){
					new CommentView({model: result});

					$('#new-comment').val(''); 
					$('#comment-by').val('');
				},
				error: function(result, error){
					console.log('No one wants to hear from the peanut gallery. ' + error);
				}
			});
		}
	}
});