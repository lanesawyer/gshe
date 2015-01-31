function User(user, authData) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.authData = authData;
};

User.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};
