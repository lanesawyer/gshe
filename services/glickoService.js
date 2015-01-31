app.factory('glickoService', function(config) {
  var glickoService = {};

  var rating = new glicko2.Glicko2(config.glicko_settings);

  glickoService.updateRatings = function(batch) {
    rating.updateRatings(batch);
  };

  glickoService.createRatingExperience = function(experience) {
    return rating.makePlayer(experience.rating, experience.rd, experience.vol);
  }

  return glickoService;
});