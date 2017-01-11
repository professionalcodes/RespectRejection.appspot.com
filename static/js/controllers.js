'use strict';

var respectRejectionApp = respectRejectionApp || {};
var controllers = respectRejectionApp.controllers = angular.module('respectRejectionAppControllers', []);

controllers.controller('RootCtrl', ['$scope', '$location', 'FirebaseService', function ($scope, $location, FirebaseService) {
	$scope.logLoaded = function() {
		FirebaseService.sayHello();
	};
	
}]);

controllers.controller('ProfileCtrl', ['$scope', '$location', function ($scope, $location) {

}]);
	