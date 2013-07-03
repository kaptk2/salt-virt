// Angular Modules
angular.module('saltVirt', ['ui.bootstrap', 'ngCookies']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: VmListCtrl}).
			when('/vms/:vmsId', {templateUrl: 'partials/vms-edit.html', controller: VmListCtrl}).
			otherwise({redirectTo: '/dashboard'});
		}
	]);
