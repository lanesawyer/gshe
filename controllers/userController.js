app.controller('UserController', function($scope, $location, $firebase, config, authService) {
  var ref = new Firebase(config.firebase_url);

  $scope.$watch(authService.isAuthenticated, function () {
    $scope.user = authService.getCurrentUser();
  });

  $scope.isAuthenticated = function() {
    return authService.isAuthenticated();
  };

  $scope.login = function(loginUser) {
    authService.login(loginUser);
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.createAccount = function(newUser) {
    authService.createAccount(newUser);
  };

  $scope.updateEmailAddress = function() {
    authService.updateEmail($scope.user.email, $scope.user.newEmail, $scope.user.password, updateEmailHandler)
  };

  function updateEmailHandler(error) {
    if(error) {
      console.log('Email not changed!', error);
    } else {
      console.log('Email successfully changed!');
    }
  };

  $scope.resetPassword = function(email) {
    authService.resetPassword(email);
  };

  $scope.changePassword = function() {
    authService.changePassword($scope.user.email, $scope.user.oldPassword, $scope.user.newPassword, changePasswordHandler);
  };

  function changePasswordHandler(error) {
    if(error) {
      console.log('Password not changed!', error);
    } else {
      console.log('Password successfully changed!');
    }
  };
});
