//Display for getHelp page:
var EventView = Backbone.View.extend({

	createTemplate: _.template($('#event-template').text()),

	events:{
		'click #volunteer': 'signUp',
		'click #add-comment': 'addComment'
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
	},

	//Again, need validation of input...must have commentText, default author to anonymous
	addComment: function(){
		var comment = new CommentClass();

		var commentText = $('#new-comment').val();
		var commentAuthor = $('#comment-by').val(); 
		var timeStamp = moment().format('MMM Do YYYY, h:mm a');

		comment.set('commentContent', commentText);
		
		//Clean this up!
		if ($('#comment-by').val() !== '') {
			comment.set('commentBy', commentAuthor);
		}

		comment.set('commentedAt', timeStamp);
		comment.set('parent', this.model);

		router.comments.add(comment);
		
		comment.save(null,{
			success: function(result){
				new CommentView({model: result});

				//Target both input fields and clear at once?
				$('#new-comment').val(''); 
				$('#comment-by').val('');
			},
			error: function(){
				console.log('Ha! No one wants to hear from the peanut gallery.');
			}
		});
	}
});


//Display for Singup modal:
var SignupView = Backbone.View.extend({

	createTemplate: _.template($('#signup-template').text()),

	events:{
		'click #signup': 'confirmSignup'
	},

	initialize: function(){
		$('body').append(this.el);

		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	},

	confirmSignup: function(){
		//Success/error message
		//Email confirmation to volunteer and event sponsor
		//Decrease volunteers needed by one
	}
});


//Display for comments:
var CommentView = Backbone.View.extend({
	tagName: 'li',

	createTemplate: _.template($('#comment-template').text()),

	initialize: function(){
		$('.prev-comments').prepend(this.el);

		this.render();
	},

	render: function(){
		this.$el.html(this.createTemplate());
	}
});