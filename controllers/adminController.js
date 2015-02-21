app.controller('AdminController', function($scope, $firebase, glickoService, config) {
  var ref = new Firebase(config.firebase_url + config.experiences_url);
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.addExperience = function(experienceDisplay) {
    var newRatingExperience = glickoService.createNewRatingExperience();
    var newExperience = new Experience(experienceDisplay, newRatingExperience);

    $scope.experiences.$add(newExperience);

    $scope.experience = '';
  };

  $scope.saveExperience = function(experience) {
    $scope.experiences.$save(experience);
  };
});
