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

// Login Function
$('#loginForm').submit(function(e) {
	e.preventDefault();

	var login;
	login = $.ajax({
		type: "POST",
		url: '/login',
		headers: {"Accept": "application/json"},
		dataType: 'json',
		data: $("#loginForm").serialize()
	})
	.done(function(data) {
		location.reload();
		console.log("Logged In");
	})
	.fail(function() { alert("error logging in"); });
});
