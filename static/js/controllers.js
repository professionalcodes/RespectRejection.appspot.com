'use strict';

var respectRejectionApp = respectRejectionApp || {};
var controllers = respectRejectionApp.controllers = angular.module('respectRejectionAppControllers', []);

controllers.controller('RootCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.logLoaded = function() {
		log("root controller loaded");
	};

	$scope.startAuthObserver = function() {
		FirebaseHandler.authObserver();
	};

	$scope.startAuthObserver();

}]);

controllers.controller('ProfileCtrl', ['$scope', '$location', function ($scope, $location) {

}]);
	