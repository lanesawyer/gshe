app.factory('authService', function($location, config) {
  var authService = {};
  
  var ref = new Firebase(config.firebase_url);

  var currentUser;

  authService.login = function(email, password, accountLoginHandler) {
    ref.authWithPassword({
        email: email,
        password: password
    }, accountLoginHandler);
  };

  authService.createAccount = function(email, password, accountCreationHandler) {
    ref.createUser({
      email: email,
      password: password
    }, accountCreationHandler);
  };

  authService.updateEmail = function(oldEmail, newEmail, password, updateEmailHandler) {
    ref.changeEmail({
      oldEmail : oldEmail,
      newEmail : newEmail,
      password : password
    }, updateEmailHandler);
  };

  authService.resetPassword = function(email, oldPassword, newPassword, resetPasswordHandler) {
    ref.changePassword({
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, resetPasswordHandler);
  };

  authService.logout = function() {
    ref.unauth();
    $location.path('/');
  };

  authService.isAuthenticated = function() {
    return ref.getAuth() ? true : false;
  };

  authService.currentUser = function(user) {
    if(user) {
      currentUser = user;
    } else {
      return currentUser;
    }
  };

  return authService;
});
