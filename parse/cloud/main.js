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

Mandrill.sendEmail({
  message: {
    text: "Hello World!",
    subject: "Using Cloud Code and Mandrill is great!",
    from_email: "parse@cloudcode.com",
    from_name: "Cloud Code",
    to: [
      {
        email: "jmiller6128@gmail.com",
        name: "Your Name"
      }
    ]
  },
  async: true
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