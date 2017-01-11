'use strict';

var respectRejectionApp = respectRejectionApp || {};
var controllers = respectRejectionApp.controllers = angular.module('respectRejectionAppControllers', []);

/* RootCtrl handles all signin options */
controllers.controller('RootCtrl', ['$scope', '$location', 'FirebaseService', function ($scope, $location, FirebaseService) {
	$scope.handleGoogleSignin = function() {
		FirebaseService.handleGithub();
	};

	$scope.handleFacebookSignin = function() {
		FirebaseService.handleFacebook();
	};

	$scope.handleTwitterSignin = function() {
		FirebaseService.handleTwitter();
	};

	$scope.handleGithubSignin = function() {
		FirebaseService.handleGithub();
	};

	$scope.handleSigninAnon = function() {
		var email = angular.element("#email");
		var password = angular.element("#password");
		FirebaseService.handleEmailPassword(email, password);
	};

	$scope.logout = function() {
		FirebaseService.logout();
	};
	
	$scope.test = function() {
	};

	$scope.test();

}]);

controllers.controller('ProfileCtrl', ['$scope', '$location', function ($scope, $location) {

}]);
	