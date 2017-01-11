/*
var config = {
    apiKey: "AIzaSyBsxkqcDK_fqEIf_Oja3MOod8L3YIhu4Fw",
    authDomain: "respectrejection.firebaseapp.com",
    databaseURL: "https://respectrejection.firebaseio.com",
    storageBucket: "respectrejection.appspot.com",
    messagingSenderId: "746933029039"
};
firebase.initializeApp(config);

function Firebase() {}

Firebase.prototype.login = function(provider) {
	firebase.auth().signInWithPopup(provider).then(function(result){
		var token = result.credential.accessToken;
		var user = result.user;
		location.reload();
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
};

Firebase.prototype.logout = function() {
	firebase.auth().signOut().then(function() {
		location.reload();
	}, function(error) {
		log(error);
	})
};

Firebase.prototype.handleGoogle = function() {
	var googleProvider = new firebase.auth.GoogleAuthProvider();
	this.login(googleProvider);	
};

Firebase.prototype.handleFacebook = function() {
	var facebookProvider = new firebase.auth.FacebookAuthProvider();
	this.login(facebookProvider);
};

Firebase.prototype.handleTwitter = function() {
	var twitterProvider = new firebase.auth.TwitterAuthProvider();
	this.login(twitterProvider);
};

Firebase.prototype.handleGithub = function() {
	var githubProvider = new firebase.auth.GithubAuthProvider();
	this.login(githubProvider);
};

Firebase.prototype.authObserver = function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var loggedInHeader = document.createElement("div");
			var loggedInBody = document.createElement("div")
  			loggedInHeader.setAttribute('ng-include', "'/logged_in_header'");
  			loggedInBody.setAttribute('ng-include', "'/logged_in_body'");
  			
  			document.body.appendChild(loggedInHeader);
  			angular.element('body').injector().invoke(['$compile', function ($compile) {
            	var $scope = angular.element(loggedInHeader).scope();
                $compile(loggedInHeader)($scope);
                $scope.$apply();
            }]);

            document.body.appendChild(loggedInBody);
            angular.element('body').injector().invoke(['$compile', function ($compile) {
            	var $scope = angular.element(loggedInBody).scope();
                $compile(loggedInBody)($scope);
                $scope.$apply();
            }]);

  		} else {
  			var notLoggedInHeader = document.createElement("div");
  			var notLoggedInBody = document.createElement("div");
  			notLoggedInHeader.setAttribute('ng-include', "'/not_logged_in_header'");
  			notLoggedInBody.setAttribute('ng-include', "'/not_logged_in_body'");
  			
  			document.body.appendChild(notLoggedInHeader);
  			angular.element('body').injector().invoke(['$compile', function ($compile) {
            	var $scope = angular.element(notLoggedInHeader).scope();
                $compile(notLoggedInHeader)($scope);
                $scope.$apply();
            }]);

            document.body.appendChild(notLoggedInBody);
  			angular.element('body').injector().invoke(['$compile', function ($compile) {
            	var $scope = angular.element(notLoggedInBody).scope();
                $compile(notLoggedInBody)($scope);
                $scope.$apply();
            }]);

            // var $scope2 = angular.element(notLoggedInBody).scope();

  		}
	});
};

jQuery(document).ready(function() {
	window.FirebaseHandler = new Firebase();
	FirebaseHandler.authObserver();
});

*/