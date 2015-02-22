function UserExperience(experience, newRatingExperience) {
  this.display = experience.display;
  this.rating = newRatingExperience.getRating();
  this.rd = newRatingExperience.getRd();
  this.vol = newRatingExperience.getVol();
  this.timesWon = 0;
  this.timesLost = 0;
  this.createdAt = Firebase.ServerValue.TIMESTAMP;
  this.archived = false;
}
