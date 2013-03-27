// Angular Modules
angular.module('saltVirt', ['ngCookies']);

function VmListCtrl($scope, $cookies) {
	var token = ($cookies.session_id) ? $cookies.session_id : "null"
	// Load VM's from Server
	$.ajax({
//		type: "GET",
//		url: '/test_data/full_info.json',
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

//		console.log($scope.hosts_vms);
//		console.log($scope.vms);
	})
	.fail(function() {
		console.log("error getting data");
	});
}
