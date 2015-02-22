function UserExperience(newRatingExperience) {
  this.rating = newRatingExperience.getRating(),
  this.rd = newRatingExperience.getRd(),
  this.vol = newRatingExperience.getVol(),
  this.timesWon = 0,
  this.timesLost = 0,
  this.createdAt = Firebase.ServerValue.TIMESTAMP,
  this.archived = false
}
