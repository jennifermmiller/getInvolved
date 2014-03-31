// Use Parse.Cloud.define to define as many cloud functions as you want.

//Decrease vonlunteersNeeded by one after someone signs up
Parse.Cloud.afterSave("VolunteerClass", function(request) {
  query = new Parse.Query("EventClass");
  query.get(request.object.get("event").id, {
    success: function(events) {
      events.increment("vonlunteersNeeded", -1);
      events.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});

{
	type: ""
}

//Removing old events:
Parse.Cloud.job("removePastEvents", function(request, status){
	Parse.Cloud.useMasterKey();

	var today = new Date();

	var query = new Parse.Query("EventClass");

	query.lessThan("eventDate", today);

	query.find({
		success: function(result){
			for (var i=0; i<result.length; i++){
				result[i].destroy({
					success: function(object){
						status.success("Past event has been deleted.");
					},
					error: function(object, error){
						status.error("Remove error:" + error);
					}
				});
			}
			status.success("Removal of past events is complete.")
		},
		error: function(error){
			status.error("Removal query error:" + error);
		}
	});
});


//Email Testing...will need to put in actual info and target to:
var Mandrill = require('mandrill');
Mandrill.initialize('mgMhu3vLZBIZkYxg8HoqjQ');

Parse.Cloud.define("sendVolConfirmation", function(request, response){
	Mandrill.sendEmail({
	  message: {
	    text: "Hello World!",
	    subject: "Signup confirmation",
	    from_email: "parse@cloudcode.com",
	    from_name: "Cloud Code",
	    to: [
	      {
	        email: "jmiller6128@gmail.com",
	        name: "Your Name"
	      }
	    ]
	  },
	  async: true //will need this since sending to mutliple users
	},{
	  success: function(httpResponse) {
	    console.log(httpResponse);
	    response.success("Email sent!");
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});
})


--------------------------------------------------------------------
Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('mgMhu3vLZBIZkYxg8HoqjQ');

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"jmiller6128@gmail.comment",
        "to":[{"email":"jmiller6128@gmail.com"}],
        "subject": "Sending a text email from the Mandrill API",
        "text": "Sweet! I'm sending myself emails!"
    }
};

function sendTheMail() {
// Send the email!

    m(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}




