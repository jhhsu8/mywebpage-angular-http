'use strict';
var routerApp = angular.module('routerApp');
routerApp.controller('IndexController', ['$scope', function($scope) {

  //open panels
  $scope.toggle = function(num) {
    if (num === 1) {
      $scope.toggleVar1 = !$scope.toggleVar1;
    } else {
      $scope.toggleVar2 = !$scope.toggleVar2;
    }
  };

  //enter and submit user comments
  $scope.enter_comment = false;
  $scope.usercomments = [];
  $scope.input = {
    name: "",
    comment: "",
    date: new Date().toISOString()
  };

  $scope.submitComment = function() {
    if (!$scope.input.comment || !$scope.input.name) {
      $scope.enter_comment = true;
    } else {
      $scope.usercomments.push($scope.input);
      $scope.input = {
        name: "",
        comment: "",
        date: new Date().toISOString()
      };
      $scope.enter_comment = false;
    }
  };

  //remove individual comments
  $scope.remove = function(index) {
    $scope.usercomments.splice(index, 1);
  };

}])

.controller('FoodController', ['$scope', 'foodFactory', function($scope, foodFactory) {
    
    //create a menu
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.foods= [];
    $scope.showFoods = false;
    $scope.message = "Loading ...";
    foodFactory.getFoods()
        .then(
        function(response) {
            $scope.foods = response.data;
            $scope.showFoods = true;
        },
        function(response) {
        $scope.message = "Error: "+response.status + 
            " " + response.statusText;
    }
    );

  //menu selections
  $scope.select = function(setTab) {
    $scope.tab = setTab;
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "main";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

}])

.controller('PhotoController', ['$scope', 'photoFactory', function($scope, photoFactory) {
    
    /* $scope.photos = [];
    photoFactory.getPhotos().then(
    function(response) {
    $scope.photos = response.data;
    }); 
    var length = $scope.photos.length; */
    
    //create a photo slideshow
    var length = 5;
    $scope.photo = {};
    $scope.showPhotos = false;
    $scope.message = "Loading ...";
    var current_index = 0;
    $scope.photo = photoFactory.getPhoto(current_index).then(
        function(response){
            $scope.photo = response.data;
            $scope.showPhotos = true;
        },
        function(response) {
                    $scope.message = "Error: " +response.status + 
                        " " + response.statusText;
                }
    );

  //next button
  $scope.next = function(){
      var next_index = current_index + 1;
      if (current_index < length - 1) {
          $scope.photo = photoFactory.getPhoto(next_index).then(
              function(response){
                  $scope.photo = response.data;
              },
              function(response) {
                    $scope.message = "Error: " +response.status + 
                        " " + response.statusText;
                }
          );
          current_index++;
      }
  };

  //previous button
  $scope.previous = function() {
      var previous_index = current_index - 1;
      if (current_index > 0) { 
      $scope.photo = photoFactory.getPhoto(previous_index).then(
          function(response){
              $scope.photo = response.data;
          },
          function(response) {
                    $scope.message = "Error: " +response.status + 
                        " " + response.statusText;
                }
      );
          current_index--;
      }
  };
}]);