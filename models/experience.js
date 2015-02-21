function Experience(experienceDisplay, newRatingExperience) {
  this.display = experienceDisplay,
  this.rating = newRatingExperience.getRating(),
  this.rd = newRatingExperience.getRd(),
  this.vol = newRatingExperience.getVol(),
  this.timesExperienced = 0,
  this.timesNotExperienced = 0,
  this.timesWon = 0,
  this.timesLost = 0,
  this.createdAt = Firebase.ServerValue.TIMESTAMP,
  this.archived = false
};
