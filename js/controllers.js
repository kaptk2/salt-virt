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
function VmListCtrl($scope, $cookies, $dialog) {
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

// Button Handlers
	$scope.virtCall = function (host, vm, action) {
		$.ajax({
			type: "POST",
			url: '/',
			headers: {
				"Accept": "application/json", 
				"X-Auth-Token": token
			},
			data: { client: "local", tgt: host, fun: action , arg: vm}
		})
		.done(function(data) {
			// Made the Call
			console.log('Call to salt-api successful\n\tHost: ' + host +'\n\tAction: ' + action + '\n\tVM: ' + vm);
			console.log(data)
		})
		.fail(function() {
			// Error
			alert('The action failed\n\tHost: ' + host +'\n\tAction: ' + action + '\n\tVM: ' + vm);
		});
	}

	$scope.confirm = function(host, vm, action){
		switch(action) {
			case 'virt.shutdown':
				var title = 'Warning: Power off ' + vm + '?';
				var msg = 'Warning you are about to power off ' + vm + '. Are you sure you want to continue?';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];
				break;

			case 'virt.reboot':
				var title = 'Warning: Reboot ' + vm + '?';
				var msg = 'Warning you are about to reboot ' + vm + '. Are you sure you want to continue?';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];
				break;

			case 'virt.reset':
				var title = 'Warning: Power cycle ' + vm + '?';
				var msg = 'Warning you are about to power cycle ' + vm + '. Are you sure you want to continue?';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];
				break;

			case 'virt.destroy':
				var title = 'Warning: Force off ' + vm + '?';
				var msg = 'Warning you are about to force off ' + vm + '. Are you sure you want to continue?';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-danger'}];
				break;

			case 'virt.purge':
				var title = 'Warning: Purge ' + vm + '?';
				var msg = 'Warning you are about to purge ' + vm + '. This operation unable to be reversed. Are you sure you want to continue?';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'DANGER!', cssClass: 'btn-danger'}];
				break;

			default:
				alert('Invalid action. This is a problem.');
		}

		$dialog.messageBox(title, msg, btns)
			.open()
			.then(function(result){
				if(result == 'yes') {
					$scope.virtCall(host, vm, action);
				}
			});
	};
}
