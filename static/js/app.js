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

app.factory('AngularHelperService', [function () {
    
    var AngularHelperService = {
        addNgInclude: function(urlPath) {
            var ngInclude = document.createElement('div');
            ngInclude.setAttribute('ng-include', "'path'".replace('path', urlPath));
            document.body.appendChild(ngInclude);
            this.compileElement(ngInclude);
        },
        addNgView: function() {
            var ngView = document.createElement("ng-view");
            document.body.appendChild(ngView);
            this.compileElement(ngView);
        },
        compileElement: function(element) {
            angular.element('body').injector().invoke(['$compile', function ($compile) {
                var $scope = angular.element(element).scope();
                $compile(element)($scope);
                $scope.$apply();
            }]);
        },
    };

    return AngularHelperService;
}])

app.factory('FirebaseService', ['AngularHelperService', function(AngularHelperService) {
    
    var FirebaseService = {
        self: this,
        config: {
            apiKey: "AIzaSyBsxkqcDK_fqEIf_Oja3MOod8L3YIhu4Fw",
            authDomain: "respectrejection.firebaseapp.com",
            databaseURL: "https://respectrejection.firebaseio.com",
            storageBucket: "respectrejection.appspot.com",
            messagingSenderId: "746933029039"
        },
        init: function() {
            firebase.initializeApp(this.config);
            this.authObserver();
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
                
                angular.element("#error-msg-container").removeClass('hide');                
                angular.element("#error-msg").text(errorMessage);
            });
        },
        authObserver: function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    AngularHelperService.addNgInclude('logged_in_header');
                    AngularHelperService.addNgInclude('logged_in_body');
                    AngularHelperService.addNgView();
                } else {
                    AngularHelperService.addNgInclude('not_logged_in_header');
                    AngularHelperService.addNgInclude('not_logged_in_body');
                    AngularHelperService.addNgView();
                }
            });
        },
    };

    return FirebaseService;

}]);

app.run(['FirebaseService', function (FirebaseService) {
    FirebaseService.init();
}])

