app.factory('experienceService', function($firebase, config) { 
  var experienceService = {};

  var ref = new Firebase(config.firebase_url + config.experiences_url);
  var sync = $firebase(ref);

  var experiences = sync.$asArray();

  experienceService.getExperiencesBatch = function() {
    return experiences;
  };

  experienceService.saveExperience = function(experience) {
    experiences.$save(experience);
  }

  return experienceService;
});
