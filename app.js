var app = angular.module('gShe', ['ngRoute', 'ngMessages', 'ngMaterial', 'firebase']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController'
  }).when('/userProfile', {
    templateUrl: 'views/userProfile.html',
    controller: 'UserController'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'UserController'
  }).when('/resetPassword', {
    templateUrl: 'views/resetPassword.html',
    controller: 'UserController'
  }).when('/createAccount', {
    templateUrl: 'views/createAccount.html',
    controller: 'UserController'
  }).when('/stackrank', {
    templateUrl: 'views/stackrank.html',
    controller: 'StackrankController'
  }).otherwise({
    templateUrl: 'views/experiences.html',
    controller: 'ExperienceController'
  });
}]);

app.constant('config', {
  'firebase_url': 'https://gshe.firebaseio.com',
  'glicko_settings': {
    // tau : 'Reasonable choices are between 0.3 and 1.2, though the system should
    //        be tested to decide which value results in greatest predictive accuracy.'
    tau : 0.5,
    // rating : default rating
    rating : 1500,
    //rd : Default rating deviation 
    //     small number = good confidence on the rating accuracy
    rd : 200,
    //vol : Default volatility (expected fluctation on the player rating)
    vol : 0.06
  },
  'version': 0.1
});

