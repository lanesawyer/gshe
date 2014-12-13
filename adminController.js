app.controller('AdminController', function($scope, $firebase) {
  var ref = new Firebase('https://g-she.firebaseio.com/experiences/');
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.addExperience = function(experience) {
    var newExperience = ranking.makePlayer();
    
    $scope.experiences.$add({
      display: experience,
      rating: newExperience.getRating(),
      rd: newExperience.getRd(),
      vol: newExperience.getVol(),
      archived: false
    });

    $scope.experience = '';
  };

  $scope.removeExperience = function(experience) {
    experience.archived = true;
    $scope.experiences.$save(experience);
  };
});
