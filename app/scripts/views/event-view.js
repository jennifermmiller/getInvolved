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
		


		

		volunteer.set('name', volunteerName);
		volunteer.set('email', volunteerEmail);
		volunteer.set('extraInfo', volunteerExtra);
		volunteer.set('parent', this.model);
	

		router.volunteers.add(volunteer);

		volunteer.save(null, {
			success: function(){
				//Success/error message...if success, model clear
				//Email confirmation to volunteer and event sponsor
				//Decrease volunteers needed by one
			},
			error: function() {
				console.log('what?! what!')
			}
		});

		
	},

	//Again, need validation of input...must have commentText, default author to anonymous
	addComment: function(){
		var comment = new CommentClass();

		var commentText = $('#new-comment').val(); 
		var timeStamp = moment().format('MMM Do YYYY, h:mm a'); //Doing extra work? Just use creaatedAt?

		comment.set('commentContent', commentText);
		
		//Clean this up! Put in with validation of commentText?
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

				//Fetch comments related to this event?


				//Target both input fields and clear at once?
				//Maybe just a cleay function that can be run in any form to clear
				$('#new-comment').val(''); 
				$('#comment-by').val('');
			},
			error: function(){
				console.log('Ha! No one wants to hear from the peanut gallery.');
			}
		});
	}
});