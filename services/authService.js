app.factory('authService', function($location, $firebaseAuth, config) {
  var authService = {};
  
  var ref = new Firebase(config.firebase_url);
  var auth = $firebaseAuth(ref);

  var currentUser;

  authService.login = function(email, password) {
    auth.$authWithPassword({
        email: email,
        password: password
    }).then(function(authData) {

      ref.child('users/' + authData.uid).once('value', function(snapshot) {
        currentUser = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      $location.path('/userProfile');
    }).catch(function(error) {
      console.error("Error: ", error);
    });;
  };

  authService.createAccount = function(user) {
    auth.$createUser({
      email: user.email,
      password: user.password
    }).then(function(userData) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }).then(function(authData) {
      var newUser = new User(user, authData);
      ref.child('users').child(authData.uid).set(newUser);
      $location.path('/userProfile');
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  };

  authService.updateEmail = function(oldEmail, newEmail, password, updateEmailHandler) {
    auth.$changeEmail({
      oldEmail : oldEmail,
      newEmail : newEmail,
      password : password
    }).then(function() {
      console.log("Email changed successfully!");
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  };

  authService.resetPassword = function(email, oldPassword, newPassword, resetPasswordHandler) {
    auth.$changePassword({
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    }).then(function() {
      console.log("Password changed successfully!");
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  };

  authService.logout = function() {
    auth.$unauth();
    $location.path('/');
  };

  authService.isAuthenticated = function() {
    return auth.$getAuth() ? true : false;
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
