app.factory('authService', function($location, $route, $firebaseAuth, config) {
  var authService = {};
  
  var ref = new Firebase(config.firebase_url);
  var auth = $firebaseAuth(ref);

  var currentUser;

  var authData = auth.$getAuth()
  if(authData) {
    ref.child('users/' + authData.uid).once('value', function(userSnapshot) {
      currentUser = userSnapshot.val();
      $route.reload();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  authService.isAuthenticated = function() {
    return auth.$getAuth() ? true : false;
  };

  authService.getAuth = function() {
    return auth.$getAuth();
  };

  authService.login = function(loginUser) {
    auth.$authWithPassword({
      email: loginUser.email,
      password: loginUser.password
    }).then(function(authData) {
      ref.child('users/' + authData.uid).once('value', function(userSnapshot) {
        currentUser = userSnapshot.val();
        $location.path('/userProfile');
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
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
      ref.child('users').child(authData.uid).set({
        firstName: newUserInfo.firstName,
        lastName: newUserInfo.lastName,
      });
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
