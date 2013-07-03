function VmListCtrl($scope, $dialog, virt) {
		$scope._ = window._;

	// Load VM's from Server
	virt.full_info(function(vms, full) {
		$scope.hosts_vms = full;
		$scope.vms = vms;

		$scope.$apply();
	});

	// Modal Handlers
	$scope.open = function (hyperName, vmName) {
		$scope.migrate = {'storage':'shared'};
		$scope.hyperName = hyperName;
		$scope.vmName = vmName;
		$scope.doMigrate = function(migrate){
			console.log('Info: ' + migrate['dest'] + migrate['storage']);
			$scope.virtCall(host, arg, action);
			$scope.shouldBeOpen = false;
		};
		$scope.shouldBeOpen = true;
	};

	$scope.close = function () {
		$scope.shouldBeOpen = false;
	};

	$scope.opts = {
		backdropFade: true,
		dialogFade:true
	};

// Button Handlers
	$scope.confirm = function(host, arg, action){
		var dialog = ListActions(action);
		$dialog.messageBox(dialog.title, dialog.msg, dialog.btns)
			.open()
			.then(function(result){
				if(result == 'yes') {
					virt.call(host, arg, action);
				}
			});
	};
}
