'use strict'
var routerApp = angular.module("routerApp", ["ui.router"]);
routerApp.config(
  ["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state("app", {
          url: "/",
          views: {
            'header': {
              templateUrl: 'views/header.html'
            },
            'content': {
              templateUrl: 'views/home.html',
              controller: 'IndexController'
            },
            'footer': {
              templateUrl: 'views/footer.html'
            }
          }
        })
        .state("app.about", {
          url: "about",
          views: {
            'content@': {
              templateUrl: 'views/about.html'
            }
          }
        })
        .state("app.resume", {
          url: "resume",
          views: {
            'content@': {
              templateUrl: 'views/resume.html'
            }
          }
        })
        .state("app.foods", {
          url: "foods",
          views: {
            'content@': {
              templateUrl: 'views/foods.html',
              controller: 'FoodController'
            }
          }
        })
        .state("app.photos", {
          url: "photos",
          views: {
            'content@': {
              templateUrl: 'views/photos.html'
            }
          }
        });
    }
  ]);