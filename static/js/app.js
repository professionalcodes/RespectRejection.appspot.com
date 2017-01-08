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

