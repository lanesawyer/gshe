function ExperiencePair(experience1, experience2) {
  this.experience1 = experience1;
  this.experience2 = experience2;
  this.winner = 0.5;
};

app.controller('ExperienceController', function($scope, $firebase, glickoService, config) {
  var ref = new Firebase(config.firebase_url + '/experiences/');
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.batch = [];
  $scope.eligibleExperiences = [];
  $scope.experienceCounter = 0;

  $scope.experiencePairs = [];
  $scope.experiencePairCounter = 0;

  $scope.experiencePlayerSet = {};

  $scope.hadExperience = function(experience) {
    experience.timesExperienced++;
    $scope.eligibleExperiences.push(experience);
    $scope.nextExperience();
  };

  $scope.notHadExperience = function(experience) {
    experience.timesNotExperienced++;
    $scope.experiences.$save(experience);
    $scope.nextExperience();
  };

  $scope.nextExperience = function() {
    $scope.experienceCounter++;
    if($scope.experienceCounter == $scope.experiences.length) {
      $scope.allExperiencesAnswered = true;
      $scope.experiencePairs = createExperiencePairs();
    }
  };

  $scope.nextExperiencePair = function(experiencePair, winner) {
    experiencePair.winner = winner;

    if(winner == 0) {
      experiencePair.experience1.timesWon++;
      experiencePair.experience2.timesLost++;
    } else {
      experiencePair.experience2.timesWon++;
      experiencePair.experience1.timesLost++;
    }

    var experience1 = createPlayerFromExperience(experiencePair.experience1);
    var experience2 = createPlayerFromExperience(experiencePair.experience2);

    $scope.batch.push([experience1, experience2, winner]);

    $scope.experiencePairCounter++;
    if($scope.experiencePairCounter == $scope.experiencePairs.length) {
      glickoService.updateRatings($scope.batch);

      updateExperiences();
    }
  };

  function createExperiencePairs() {
    var experiencePairs = [];
    
    for(var i = 0; i < $scope.eligibleExperiences.length; i++) {
      for(var j = i + 1; j < $scope.eligibleExperiences.length; j++) {
        experiencePairs.push(new ExperiencePair($scope.eligibleExperiences[i], $scope.eligibleExperiences[j]));
      }
    }

    return experiencePairs;
  };

  function createPlayerFromExperience(experience) {
    if(!$scope.experiencePlayerSet[experience.$id]) {
      $scope.experiencePlayerSet[experience.$id] = glickoService.createRatingExperience(experience);
    }

    return $scope.experiencePlayerSet[experience.$id];
  };

  function updateExperiences() {
    angular.forEach($scope.experiencePlayerSet, function(value, key) {
      var experience = $scope.experiences.$getRecord(key);
      experience.rating = value.getRating();
      experience.rd = value.getRd();
      experience.vol = value.getVol();
      $scope.experiences.$save(experience);
    });
  };
});
