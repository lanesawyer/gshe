app.factory('userExperienceService', function(experienceService, config) { 
  var userExperienceService = {};

  var potentialExperiences = [];
  var potentialExperiencesCounter = 0;

  var experiencedExperiences = [];
  var experiencedExperiencesCounter = 0;

  var experiencePairs = [];
  var experiencePairsCounter = 0;

  var experiencePlayers = {};

  userExperienceService.getExperiencesBatch = function() {
    potentialExperiences = experienceService.getExperiencesBatch();
    return potentialExperiences;
  };

  userExperienceService.getNextPotentialExperience = function() {
    return potentialExperiences[potentialExperiencesCounter];
  };

  userExperienceService.hasHadExperience = function(experience) {
    experiencedExperiences.push(experience);
    potentialExperiencesCounter++;
  };

  userExperienceService.hasNotHadExperience = function(experience) {
    experienceService.hasNotHadExperience(experience);
    potentialExperiencesCounter++;
  };

  userExperienceService.hasMorePotentialExperiences = function() {
    return potentialExperiencesCounter < potentialExperiences.length - 1;
  };

  function createExperiencePairs() {    
    for(var i = 0; i < experiencedExperiences.length; i++) {
      for(var j = i + 1; j < experiencedExperiences.length; j++) {
        experiencePairs.push(new ExperiencePair(experiencedExperiences[i], experiencedExperiences[j]));
      }
    }
  };

  function createPlayerFromExperience(experience) {
    if(!experiencePlayers[experience.$id]) {
      experiencePlayers[experience.$id] = glickoService.createRatingExperience(experience);
    }

    return experiencePlayers[experience.$id];
  };

  function updateExperiences() {
    angular.forEach(experiencePlayers, function(value, key) {
      var experience = potentialExperiences.$getRecord(key);
      experience.rating = value.getRating();
      experience.rd = value.getRd();
      experience.vol = value.getVol();
      experienceService.saveExperience(experience);
    });
  };

  return userExperienceService;
});
