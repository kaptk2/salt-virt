// Login Function
function LoginCtrl ($scope, $cookies) {

	$scope.login = function () {
		$scope.user.eauth = "pam";

		$.ajax({
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
	}

	$scope.logout = function () {
		var token = ($cookies.session_id) ? $cookies.session_id : "null"

		$.ajax({
			type: "POST",
			url: '/logout',
			headers: {"Accept": "application/json", "X-Auth-Token": token}
		})
		.done(function(data) {
				location.reload();
				console.log("Logged Out");
		})
	}
};

// Main View
function VmListCtrl($scope, $cookies) {
	var token = ($cookies.session_id) ? $cookies.session_id : "null"
	// Load VM's from Server
	$.ajax({
		type: "POST",
		url: '/',
		headers: {
			"Accept": "application/json", 
			"X-Auth-Token": token
		},
		data: { client: "local", tgt: "*", fun: "virt.full_info" }
	})
	.done(function(data) {
		console.log('Successfuly got Virtual Machines');
		var full_data = {minions: []};
		var vm_data = [];
		_.map(data['return'][0], function(vmobj, minion) {
			if (_.isObject(vmobj))
			{
				_.map(vmobj.vm_info, function(info, name){
					vm_data.push({vm_name: name, vm_host: minion, vm_info: info})
				})
				full_data.minions.push(_.extend({minion: minion}, vmobj));
			}
		});

		$scope.hosts_vms = full_data;
		$scope.vms = vm_data;
		$scope._ = window._;
		$scope.$apply();

	})
	.fail(function() {
		console.log("error getting data");
	});
}
