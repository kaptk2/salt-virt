// Login Function
function LoginCtrl ($scope, virt) {
	$scope.login = function () {
		$scope.user.eauth = "pam";
		virt.login($("#loginForm").serialize());
	}

	$scope.logout = function () {
		virt.logout();
	}
};
