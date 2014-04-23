if (screen.width <= 480) {
 document.getElementById("viewport").setAttribute("content", "width=480; initial-scale=0.5");   
}

$(document).ready(function(){
	Parse.initialize("BVqqHnDg3xhdBezKMQFxvzdjHx98lJDRJxjCJy9H", "9HXAYhUbtdZsRREtIp9K7YChpvAFAeWsTBZAYkPt");

	window.router = new Router();

	Backbone.history.start();

    //Form validation for get help:
    //Not checking numbers  
    $('#event-details').validate({
        rules: {
            eventName : {
                required: true,
                minlength: 2,
                maxlength: 32
            },
            eventAddress : {
                required: true,
                minlength: 10
            },
            eventDate: {
                date: true,
                required: true
            },
            startEvent: {
                required: true
            },
            eventDuration: {
                range: [1,12],
                required: true
            },
            eventDescription: {
                required: true
            },
            eventSponsor: {
                required: true,
                minlength: 2
            },
            sponsorEmail: {
                required: true,
                email: true
            },
            eventPledge: {
                required: true
            },
            neededVols: {
                range: [1, 100],
                required: true
            },
            eventCategory: {
                required: true
            },
            eventPhoto: {
                required: true
            } //maybe not, need to find good generic photo
        },
       //  highlight: function(element) {
       //     $(element).closest('.control-group').removeClass('success').addClass('error');
       //  },
       //  success: function(element) {
       //     element
       //     .text('OK!').addClass('valid')
       //     .closest('.control-group').removeClass('error').addClass('success');
       // }
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('valid').addClass('error');
        },
        unhighlight: function (element) {
            $(element).closest('.control-group').removeClass('error').addClass('valid');
        }
    });
});



     


//  function validateNums(){
//      if ($('#event-duration').val > 1 && $('#needed-vols'). val < 1) {
//  }


// Things to be fixed down the road and stage 2 ideas: 
//     add to about page (see comment above template)
// 	Look into Bootstrap form validation... add/remove warning class
//     Focus all inputs on hover...add enter
//     Add type to event form (need to find a database for options)
//     Right now, querying to hide past events, would like to have backround function that destroys out-dated models
// 	logins, comments w/ reply option