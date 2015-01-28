app.factory('authService', function($location, config) {
  var authService = {};
  
  var ref = new Firebase(config.firebase_url);
  var newUser = false;

  authService.login = function(email, password) {
    ref.authWithPassword({
        email: email,
        password: password
    }, accountLoginHandler);
  };

  function accountLoginHandler(error, authData) {
    if(error) {
      console.log('Login Failed!', error);
    } else {
      $location.path('/userProfile');
    }
  };

  authService.createAccount = function(email, password) {
    ref.createUser({
      email: email,
      password: password
    }, accountCreationHandler);
  };

  function accountCreationHandler(error, authData) {
    if(error) {
      console.log('Account Creation Failed!', error);
    } else {
      var user = new User($scope.user);

      ref.child('users').child(authData.uid).set(user);

      $location.path('/login');
    }
  };

  authService.logout = function() {
    ref.unauth();
    $location.path('/');
  };

  authService.isAuthenticated = function() {
    return ref.getAuth() ? true : false;
  };

  return authService;
});
