function User(user, authData) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.authData = authData;
};

User.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};

var genderOptions = [
  'Male', 'Female'
];

var ageOptions = [
  'Under 12 years old',
  '12-17 years old',
  '18-24 years old',
  '25-34 years old',
  '35-44 years old',
  '45-54 years old',
  '55-64 years old',
  '65-74 years old',
  '75 years or older'
];

var ethnicityOptions = [
  'White',
  'Hispanic or Latino',
  'Black or African American',
  'Native American or American Indian',
  'Asian / Pacific Islander',
  'Other'
];

var eduationOptions = [
  'No schooling completed',
  'Nursery school to 8th grade',
  'Some high school, no diploma',
  'High school graduate, diploma or the equivalent (for example: GED)',
  'Some college credit, no degree',
  'Trade/technical/vocational training',
  'Associate degree',
  'Bachelor’s degree',
  'Master’s degree',
  'Professional degree',
  'Doctorate degree'
];

var maritalStatusOptions = [
  'Single, never married',
  'Married or domestic partnership',
  'Widowed',
  'Divorced',
  'Separated'
];

var employmentStatusOptions = [
  'Employed for wages',
  'Self-employed',
  'Out of work and looking for work',
  'Out of work but not currently looking for work',
  'A homemaker',
  'A student',
  'Military',
  'Retired',
  'Unable to work',
];