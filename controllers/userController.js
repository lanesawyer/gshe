app.controller('UserController', function($scope, $location, $firebase, config, authService) {
  var ref = new Firebase(config.firebase_url);

  $scope.$watch(authService.isAuthenticated, function () {
    $scope.user = authService.currentUser();
  });

  $scope.login = function() {
    authService.login($scope.user.email, $scope.user.password, accountLoginHandler);
  };

  function accountLoginHandler(error, authData) {
    if(error) {
      console.log('Login Failed!', error);
    } else {
      if($scope.user.firstName && $scope.user.lastName) {
        $scope.user = new User($scope.user, authData);
        ref.child('users').child(authData.uid).set($scope.user);
      }

      authService.currentUser($scope.user);

      $location.path('/userProfile');
      $scope.$apply();
    }
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.isAuthenticated = function() {
    return authService.isAuthenticated();
  };

  $scope.createAccount = function(form) {
    authService.createAccount($scope.user.email, $scope.user.password, accountCreationHandler);
  };

  function accountCreationHandler(error) {
    if(error) {
      console.log('Account Creation Failed!', error);
    } else {
      $scope.login();
    }
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
