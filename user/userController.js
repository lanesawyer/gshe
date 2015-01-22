app.controller('UserController', function($scope, $location, $firebase) {
  var ref = new Firebase('https://gshe.firebaseio.com/');

  $scope.login = function() {
    ref.authWithPassword({
        email: $scope.user.email,
        password : $scope.user.password
    }, accountLoginHandler);
  };

  $scope.logout = function() {
    ref.unauth();
    $location.path('/');
  };

  $scope.isAuthenticated = function() {
    return ref.getAuth() ? true : false;
  };

  $scope.createAccount = function() {
    ref.createUser({
      email: $scope.user.email,
      password : $scope.user.password
    }, accountCreationHandler);
  };

  function accountLoginHandler(error, authData) {
    if(error) {
      console.log('Login Failed!', error);
    } else {
      $location.path('/userProfile');
      console.log('Authenticated successfully with payload:', authData);
    }
  };

  function accountCreationHandler(error, authData) {
    if(error) {
      console.log('Account Creation Failed!', error);
    } else {
      $scope.login();
      console.log('Successfully created account.', authData);
    }
  };
});