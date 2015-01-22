app.factory('authService', function($location) {
  var authService = {};
  
  var ref = new Firebase('https://gshe.firebaseio.com/');
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

      if(newUser) {
        var user = new User($scope.user);

        ref.child('users').child(authData.uid).set(authData);
      }

      $location.path('/userProfile');
      console.log('Authenticated successfully with payload:', authData);
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
      newUser = true;
      authService.login();
      console.log('Successfully created account.', authData);
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