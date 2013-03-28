$.ajaxSetup({
	statusCode: {
		401: function(){
			// Show the login modal box
			$('#login').modal('show');
		},
		403: function() {
			// 403 -- Access denied (not used right now)
			$("#access-error").show();
		}
	}
});

// Permission Denied Error
$("#error-close").click(function() {
	$("#access-error").hide();
});
