app.controller('UserController', function($scope, $location, $firebase) {
  var ref = new Firebase('https://gshe.firebaseio.com/');
  var userRef = new Firebase('https://gshe.firebaseio.com/users');

  var newUser = false;

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

      if(newUser) {
        var user = new User($scope.user);

        ref.child('users').child(authData.uid).set(authData);
      }

      $location.path('/userProfile');
      console.log('Authenticated successfully with payload:', authData);
    }
  };

  function accountCreationHandler(error, authData) {
    if(error) {
      console.log('Account Creation Failed!', error);
    } else {
      newUser = true;
      $scope.login();
      console.log('Successfully created account.', authData);
    }
  };
});