function User(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.gender = user.gender;
  this.age = user.age;
  this.ethnicity = user.ethnicity;
  this.education = user.education;
  this.maritalStatus = user.maritalStatus;
  this.employmentStatus = user.employmentStatus;
};

User.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};
