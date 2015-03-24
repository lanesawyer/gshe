app.controller('UserExperienceController', function($scope, $firebase, authService, userExperienceService, glickoService, config) {
  var ref = new Firebase(config.firebase_url + 'user-experiences/');

  $scope.experiences = userExperienceService.getExperiencesBatch();

  $scope.$watch(authService.getCurrentUser, function (currentUser) {
    if(currentUser) {
      $scope.user = new User(currentUser);

      var userExperiences = new Firebase(config.firebase_url + 'user-experiences/' + authService.getAuth().uid);
      var sync = $firebase(userExperiences);
      $scope.userExperiences = sync.$asArray();
    }
  });

  $scope.addUserExperience = function(experience) {
    var userId = authService.getAuth().uid;

    var newRatingExperience = glickoService.createNewRatingExperience();

    var newUserExperience = new UserExperience(experience, newRatingExperience);
    ref.child(userId).child(experience.$id).set(newUserExperience);
  };

  $scope.removeUserExperience = function(userExperience) {
    var userId = authService.getAuth().uid;
    ref.child(userId).child(userExperience.$id).update({
      archived: true
    });
  };
});