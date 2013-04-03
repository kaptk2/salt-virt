var directivesModule = angular.module('saltVirt.directives', []);
directivesModule.directive('ngConfirm', function(PopupService) {
	return {
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			// Could have custom or boostrap modal options here
			var popupOptions = {};
			element.bind("click", function()
			{
				console.log('I got a click!');
				PopupService.confirm(attrs["title"], attrs["actionText"], 
						attrs["actionButtonText"], attrs["actionFunction"], 
						attrs["cancelButtonText"], attrs["cancelFunction"], 
						scope, popupOptions);
			});
		}
	};
	
});

var servicesModule = angular.module('saltVirt.service', []);
servicesModule.factory('PopupService', function ($http, $compile)
{
	var popupService = {};

	// Get the popup
	popupService.getPopup = function(create)
	{
		if (!popupService.popupElement && create)
		{ 
			popupService.popupElement = $( '<div class="modal hide"></div>' );
			popupService.popupElement.appendTo( 'BODY' );
		}

		return popupService.popupElement;
	}

	popupService.compileAndRunPopup = function (popup, scope, options) {
		$compile(popup)(scope);
		popup.modal(options);
	}

	popupService.confirm = function(title, actionText, actionButtonText, actionFunction, cancelButtonText, cancelFunction, scope, options) {
		actionText = (actionText) ? actionText : "Are you sure?";
		actionButtonText = (actionButtonText) ? actionButtonText : "Ok";
		cancelButtonText = (cancelButtonText) ? cancelButtonText : "Cancel";
		
		var popup = popupService.getPopup(true);
		var confirmHTML = "";
		if (title)
		{
			confirmHTML += "<div class=\"modal-header\"><h1>"+title+"</h1></div>";
		}
		confirmHTML += "<div class=\"modal-body\">"+actionText+"</div>"
					+	"<div class=\"modal-footer\">";
		if (actionFunction)
		{
			confirmHTML += "<button class=\"btn btn-primary\" ng-click=\""+actionFunction+"\">"+actionButtonText+"</button>";
		}
		else
		{
			confirmHTML += "<button class=\"btn btn-primary\">"+actionButtonText+"</button>";
		}
		if (cancelFunction)
		{
			confirmHTML += "<button class=\"btn btn-cancel\" ng-click=\""+cancelFunction+"\">"+cancelButtonText+"</button>";
		}
		else
		{
			confirmHTML += "<button class=\"btn btn-cancel\">"+cancelButtonText+"</button>";
		}
		confirmHTML += "</div>";
		popup.html(confirmHTML);
		if (!actionFunction)
		{
			popup.find(".btn-primary").click(function () {
				popupService.close();
			});
		}
		if (!cancelFunction)
		{
			popup.find(".btn-cancel").click(function () {
				popupService.close();
			});
		}
		popupService.compileAndRunPopup(popup, scope, options);
	}

	popupService.close = function()
	{
		var popup = popupService.getPopup()
		if (popup)
		{
			popup.modal('hide');
		}
	}

	return popupService;

});

// Angular Modules
angular.module('saltVirt', ['saltVirt.directives', 'saltVirt.service', 'ngCookies']);
