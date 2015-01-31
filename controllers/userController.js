app.controller('UserController', function($scope, $location, $firebase, config, authService) {
  var ref = new Firebase(config.firebase_url);

  $scope.$watch(authService.isAuthenticated, function () {
    $scope.user = authService.currentUser();
  });

  $scope.login = function() {
    authService.login($scope.user.email, $scope.user.password);
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.isAuthenticated = function() {
    return authService.isAuthenticated();
  };

  $scope.createAccount = function(form) {
    authService.createAccount($scope.user);
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

  $scope.resetPassword = function() {
    authService.resetPassword($scope.user.email, $scope.user.oldPassword, $scope.user.newPassword, resetPasswordHandler);
  };

  function resetPasswordHandler(error) {
    if(error) {
      console.log('Password not changed!', error);
    } else {
      console.log('Password successfully changed!');
    }
  };
});
