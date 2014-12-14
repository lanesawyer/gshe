var settings = {
  // tau : 'Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy.'
  tau : 0.5,
  // rating : default rating
  rating : 1500,
  //rd : Default rating deviation 
  //     small number = good confidence on the rating accuracy
  rd : 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol : 0.06
};

var ranking = new glicko2.Glicko2(settings);

var app = angular.module('gShe', ['ngRoute', 'ngMaterial', 'firebase']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/admin', {
    templateUrl: 'admin.html',
    controller: 'AdminController'
  }).when('/stackrank', {
    templateUrl: 'stackrank.html',
    controller: 'StackrankController'
  }).otherwise({
    templateUrl: 'experiences.html',
    controller: 'ExperienceController'
  });
}]);