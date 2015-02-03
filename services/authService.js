app.factory('authService', function($location, $firebaseAuth, config) {
  var authService = {};
  
  var ref = new Firebase(config.firebase_url);
  var auth = $firebaseAuth(ref);

  var userId;
  var currentUser;

  authService.isAuthenticated = function() {
    return auth.$getAuth() ? true : false;
  };

  authService.login = function(loginUser) {
    auth.$authWithPassword({
        email: loginUser.email,
        password: loginUser.password
    }).then(function(authData) {

      ref.child('users/' + authData.uid).once('value', function(userSnapshot) {
        currentUser = userSnapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      $location.path('/userProfile');
    }).catch(function(error) {
      console.error("Error: ", error);
    });;
  };

  authService.logout = function() {
    auth.$unauth();
    $location.path('/');
  };

  authService.createAccount = function(newUserInfo) {
    auth.$createUser({
      email: newUserInfo.email,
      password: newUserInfo.password
    }).then(function(userData) {
      return auth.$authWithPassword({
        email: newUserInfo.email,
        password: newUserInfo.password
      });
    }).then(function(authData) {
      var newUser = new User(newUserInfo, authData);
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

  authService.resetPassword = function(email) {
    auth.$resetPassword({
      email: email
    }).then(function() {
      console.log("Password reset email sent successfully!");
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  };

  authService.changePassword = function(email, oldPassword, newPassword, changePasswordHandler) {
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

  authService.getCurrentUser = function() {
    return currentUser;
  };

  return authService;
});
