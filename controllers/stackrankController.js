app.controller('StackrankController', function($scope, $firebase, config, authService, glickoService) { 
  var ref = new Firebase(config.firebase_url + config.experiences_url);
  var sync = $firebase(ref);

  $scope.stackrank = sync.$asArray();

  $scope.searchForExperience = function(searchString) {

  };

  $scope.markAsExperienced = function(experience) {
    var userId = authService.getAuth().uid;
    var userExperiences = new Firebase(config.firebase_url + 'user-experiences/' + userId);

    var newRatingExperience = glickoService.createNewRatingExperience();

    var newUserExperience = new UserExperience(experience, newRatingExperience);
    userExperiences.child(experience.$id).set(newUserExperience);
  };

  $scope.isAuthenticated = function() {
    return authService.isAuthenticated();
  };
});
