app.controller('UserController', function($scope, $location, $firebase, config, authService) {
  var ref = new Firebase(config.firebase_url);

  $scope.login = function() {
    authService.login($scope.user.email, $scope.user.password);
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.isAuthenticated = function() {
    authService.isAuthenticated();
  };

  $scope.createAccount = function() {
    authService.createAccount($scope.user.email, $scope.user.password);
  };
});
