'use strict';
var routerApp = angular.module('routerApp').constant("baseURL","http://localhost:3000/");

//define a service called foodFactory 
routerApp.service('foodFactory', ['$http', 'baseURL', function($http,baseURL) {
  
  //implement the function called getFoods
    this.getFoods = function(){
        return $http.get(baseURL+"foods");
    };
}])

//define a service called photoFactory 
.service('photoFactory', ['$http', 'baseURL',function($http,baseURL) {

  // implement two functions, getPhotos and getPhoto(index)
     this.getPhotos = function() {
         return $http.get(baseURL+"photos");
     };
    this.getPhoto = function (index) {
        return $http.get(baseURL+"photos/"+index);
    };
}]);