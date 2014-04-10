//Display for getHelp page:
var EventView = Backbone.View.extend({

	className: 'event-focus',

	createTemplate: _.template($('#event-template').text()),

	events:{
		'click #signup': 'signMeUp',
		'click #add-comment-btn': 'addComment'
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

		//Fix this so on signup, number of volunters needed updates:
		//this.listenTo(this.model, 'change', this.render);

		var volsNeeded = this.model.get("peopleWanted");
		if (volsNeeded < 1) {
			$('#volunteer').prop("disabled",true);
		}

	},

	render: function(){
		this.$el.html(this.createTemplate({model: this.model}));
	},

	signMeUp: function(){
		var volunteer = new VolunteerClass();
		var volsNeeded = this.model.get("peopleWanted");

		if ($('#volunteer-name').val() !== '' && $('#volunteer-email').val() !== '') {

			var volunteerName = $('#volunteer-name').val();
			var volunteerEmail = $('#volunteer-email').val();
			var volunteerExtra = $('#volunteer-extra').val();

			volunteer.set('name', volunteerName);
			volunteer.set('email', volunteerEmail);
			volunteer.set('extraInfo', volunteerExtra);
			volunteer.set('parent', this.model);
		
			router.volunteers.add(volunteer);

			var that = this;
			volunteer.save(null, {
				success: function(result){
					//Decrease volunteers needed by one
					//refresh page?
					var query = new Parse.Query("EventClass");
					query.get(that.model.id, {
						success: function(result){
							result.increment("peopleWanted", -1);
							result.save();
						}
					});

					//Remove modal:
					//Put a transition on this stuff:
					$('#myModal').hide();
					$('.modal-backdrop').hide();

					//Email confirmation to volunteer and event sponsor
				},
				error: function(result,error) {
					console.log('Opps! ' + error + "just happened");
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