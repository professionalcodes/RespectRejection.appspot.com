'use strict';

var app = angular.module('respectRejectionApp', ['respectRejectionAppControllers', 'ngRoute']);

/* routing configuration for production */
var routeConfig = function($routeProvider) {
    $routeProvider.when('/contact', {
        templateUrl: '/contact',
    });
    $routeProvider.when('/about', {
        templateUrl: '/about',
    });
    $routeProvider.when('/profile', {
        templateUrl: '/profile',
        controller: 'ProfileCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
};

routeConfig.$inject = ["$routeProvider"];
app.config(routeConfig);

app.service('AngularHelperService', [function () {
    
    var AngularHelperService = {
        addElementAndCompile: function() {
            log("angular helper service");
        },
    };

    return AngularHelperService;
}])
app.factory('FirebaseService', [ function() {
    
    var FirebaseService = {
        self: this,
        user: false,
        config: {
            apiKey: "AIzaSyBsxkqcDK_fqEIf_Oja3MOod8L3YIhu4Fw",
            authDomain: "respectrejection.firebaseapp.com",
            databaseURL: "https://respectrejection.firebaseio.com",
            storageBucket: "respectrejection.appspot.com",
            messagingSenderId: "746933029039"
        },
        init: function() {
            log("initializing firebase app and starting auth observer");
            firebase.initializeApp(this.config);
            this.authObserver();
        },
        test: function() {
            log('test method being called on object instantiation');
        },
        login: function(provider) {
            firebase.auth().signInWithPopup(provider).then(function(result){
                var token = result.credential.accessToken;
                var user = result.user;
                location.reload();
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                angular.element('#login-error-msg').text(errorMessage);
                angular.element("#login-error-email").text(email);
                angular.element('#login-error-modal').modal();
            });
        },
        logout: function() {
            firebase.auth().signOut().then(function() {
                location.reload();
            }, function(error) {
                log(error);
            });
        },
        handleGoogle: function() {
            var googleProvider = new firebase.auth.GoogleAuthProvider();
            this.login(googleProvider); 
        },
        handleFacebook: function() {
            var facebookProvider = new firebase.auth.FacebookAuthProvider();
            this.login(facebookProvider);
        },
        handleTwitter: function() {
            var twitterProvider = new firebase.auth.TwitterAuthProvider();
            this.login(twitterProvider);
        },
        handleGithub: function() {
            var githubProvider = new firebase.auth.GithubAuthProvider();
            this.login(githubProvider);
        },
        handleEmailPassword: function(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                logArgs([errorCode, errorMessage]);
            });
        },
        authObserver: function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    self.user = user;
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
                    self.user = false;
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
                }
            });
        },
    };

    return FirebaseService;
}]);

app.run(['FirebaseService', function (FirebaseService) {
    FirebaseService.init();
}])

