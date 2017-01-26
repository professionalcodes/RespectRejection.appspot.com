'use strict';

var respectRejectionApp = respectRejectionApp || {};
var controllers = respectRejectionApp.controllers = angular.module('respectRejectionAppControllers', []);

/* RootCtrl handles all signin options */
controllers.controller('RootCtrl', ['$scope', '$location', 'FirebaseService', 'StripeService', function ($scope, $location, FirebaseService, StripeService) {
	
	$scope.donationAmount = 0;

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

	$scope.handleEmailPasswordSignup = function() {
		var email = angular.element("#email").val();
		var password = angular.element("#password").val();
		FirebaseService.handleEmailPasswordSignup(email, password);
	};

	$scope.handleEmailPasswordLogin = function() {
		var email = angular.element("#login-email").val();
		var password = angular.element("#login-password").val();
		FirebaseService.handleEmailPasswordLogin(email, password);
	};

	$scope.handleDonation = function() {
		StripeService.attemptPayment();
	}

	$scope.logout = function() {
		FirebaseService.logout();
	};

	$scope.showModal = function(modalIdentifier) {
		angular.element(modalIdentifier).modal();
	};

	$scope.test = function() {
		
	};

}]);

controllers.controller('ProfileCtrl', ['$scope', '$location', function ($scope, $location) {

}]);
	