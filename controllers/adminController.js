app.controller('AdminController', function($scope, $firebase, config) {
  var ref = new Firebase(config.firebase_url + '/experiences/');
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.addExperience = function(experience) {
    var newExperience = ranking.makePlayer();

    $scope.experiences.$add({
      display: experience,
      rating: newExperience.getRating(),
      rd: newExperience.getRd(),
      vol: newExperience.getVol(),
      timesExperienced: 0,
      timesNotExperienced: 0,
      timesWon: 0,
      timesLost: 0,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      archived: false
    });

    $scope.experience = '';
  };

  $scope.saveExperience = function(experience) {
    $scope.experiences.$save(experience);
  };
});
