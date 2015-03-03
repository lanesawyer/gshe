app.controller('UserController', function($scope, $location, $firebase, config, authService) {
  var ref = new Firebase(config.firebase_url);

  $scope.$watch(authService.getCurrentUser, function (currentUser) {
    if(currentUser) {
      $scope.user = new User(currentUser);

      var userExperiences = new Firebase(config.firebase_url + 'user-experiences/' + authService.getAuth().uid);
      var sync = $firebase(userExperiences);
      $scope.userExperiences = sync.$asArray();
    }
  });

  $scope.isAuthenticated = function() {
    return authService.isAuthenticated();
  };

  $scope.login = function(loginUser) {
    authService.login(loginUser);
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.createAccount = function(newUser) {
    authService.createAccount(newUser);
  };

  $scope.updateEmailAddress = function(newEmail, password) {
    authService.updateEmail(authService.getAuth().password.email, newEmail, password, updateEmailHandler);
  };

  function updateEmailHandler(error) {
    if(error) {
      console.log('Email not changed!', error);
    } else {
      console.log('Email successfully changed!');

    }
  };

  $scope.resetPassword = function(email) {
    authService.resetPassword(email);
  };

  $scope.changePassword = function(oldPassword, newPassword) {
    authService.changePassword(authService.getAuth().password.email, oldPassword, newPassword, changePasswordHandler);
  };

  function changePasswordHandler(error) {
    if(error) {
      console.log('Password not changed!', error);
    } else {
      console.log('Password successfully changed!');
    }
  };

  $scope.updateProfile = function(user) {
    var ref = new Firebase(config.firebase_url);
    ref.child('users/' + authService.getAuth().uid).update(user, function(error){
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
      }
    });
  };

  $scope.genderOptions = [
    'Female', 'Male', 'Other'
  ];

  $scope.ageOptions = [
    'Under 12 years old',
    '12-17 years old',
    '18-24 years old',
    '25-34 years old',
    '35-44 years old',
    '45-54 years old',
    '55-64 years old',
    '65-74 years old',
    '75 years or older'
  ];

  $scope.ethnicityOptions = [
    'White',
    'Hispanic or Latino',
    'Black or African American',
    'Native American or American Indian',
    'Asian / Pacific Islander',
    'Other'
  ];

  $scope.eduationOptions = [
    'No schooling completed',
    'Nursery school to 8th grade',
    'Some high school, no diploma',
    'High school graduate, diploma or the equivalent (for example: GED)',
    'Some college credit, no degree',
    'Trade/technical/vocational training',
    'Associate degree',
    'Bachelors degree',
    'Masters degree',
    'Professional degree',
    'Doctorate degree'
  ];

  $scope.maritalStatusOptions = [
    'Single, never married',
    'Married or domestic partnership',
    'Widowed',
    'Divorced',
    'Separated'
  ];

  $scope.employmentStatusOptions = [
    'Employed for wages',
    'Self-employed',
    'Out of work and looking for work',
    'Out of work but not currently looking for work',
    'A homemaker',
    'A student',
    'Military',
    'Retired',
    'Unable to work',
  ];
});
