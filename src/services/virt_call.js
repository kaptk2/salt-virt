angular.module("saltVirt").factory("virt", function($cookies){
	function token(){
		return ($cookies.session_id) ? $cookies.session_id : "null";
	}

	function vc(host, arg, action, cb) {
		/*
		This is the prototype of curl call that we replicate
		curl -si https://localhost:8000 \
				    -H "Accept: application/json" \
				    -H "X-Auth-Token: d40d1e1e" \
				    -d client=local \
				    -d tgt='*' \
				    -d fun='test.ping' \
				    -d arg
		*/
		data = { client: "local", tgt: host, fun: action };
		if(arg){
			data.arg = arg;
		}

		$.ajax({
			type: "POST",
			url: '/',
			headers: {
				"Accept": "application/json", 
				"X-Auth-Token": token
			},
			data: data
		})
		.done(function(data) {
			// Made the Call TODO see if call was successful.
			console.log('Call to salt-api successful\n\tHost: ' + host +'\n\tAction: ' + action + '\n\tArg: ' + arg);
			console.log(data);
			cb(data);
		})
		.fail(function() {
			// Error
			alert('The action failed\n\tHost: ' + host +'\n\tAction: ' + action + '\n\tArg: ' + arg);
		});
	}

	var loading = false;
	function full_info(cb){
		if(!loading){
			loading = true;
			vc('*', "", "virt.full_info", function(data){
				console.log('Successfuly got Virtual Machines');
				var full = {minions: []};
				var vms = [];
				_.map(data['return'][0], function(vmobj, minion) {
					if (_.isObject(vmobj))
					{
						_.map(vmobj.vm_info, function(info, name){
							vms.push({vm_name: name, vm_host: minion, vm_info: info})
						})
						full.minions.push(_.extend({minion: minion}, vmobj));
					}
				});
				cb(vms, full);
				loading = false;
			});
		}
	}

	function login(data){
		$.ajax({
			type: "POST",
			url: '/login',
			headers: {"Accept": "application/json"},
			dataType: 'json',
			data: data
		})
		.done(function(data) {
			$cookies.
			location.reload();
			console.log("Logged In");
		})
		.fail(function() { alert("error logging in"); });
	}

	function logout(){
		$.ajax({
			type: "POST",
			url: '/logout',
			headers: {"Accept": "application/json", "X-Auth-Token": token()}
		})
		.done(function(data) {
				location.reload();
				console.log("Logged Out");
		})
	}

	return {
		call: vc,
		login: login,
		full_info: full_info,
		info: undefined, //TODO
		logout: logout
	}
});

