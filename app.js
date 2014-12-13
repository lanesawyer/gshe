var app = angular.module("gShe", ["firebase"]);

app.controller("ExperienceController", function($scope, $firebase) {
  var ref = new Firebase("https://g-she.firebaseio.com/experiences/");
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.batch = [];
  $scope.eligibleExperiences = [];
  $scope.experienceCounter = 0;

  $scope.hadExperience = function(experience) {
    $scope.eligibleExperiences.push(experience);
    $scope.nextExperience();
  };

  $scope.nextExperience = function() {
    $scope.experienceCounter++;
  };

  $scope.allExperiencesAnswered = function() {
    return $scope.experienceCounter == $scope.experiences.length;
  };
});

app.controller("PairController", function($scope, $firebase) {
  var ref = new Firebase("https://g-she.firebaseio.com/pairs/");
  var sync = $firebase(ref);

  function pairExists(experience1, experience2) {

  };
});

app.controller("AdminController", function($scope, $firebase) {
  var ref = new Firebase("https://g-she.firebaseio.com/experiences/");
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.addExperience = function(experience) {
    $scope.experiences.$add({name: experience, value: experience});
  };
});

var settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau : 0.5,
  // rating : default rating
  rating : 1500,
  //rd : Default rating deviation 
  //     small number = good confidence on the rating accuracy
  rd : 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol : 0.06
};

var ranking = new glicko2.Glicko2(settings);

// Create players
var Ryan = ranking.makePlayer();
var Bob = ranking.makePlayer(1400, 30, 0.06);
var John = ranking.makePlayer(1550, 100, 0.06);
var Mary = ranking.makePlayer(1700, 300, 0.06);

var matches = [];
matches.push([Ryan, Bob, 1]); //Ryan won over Bob
matches.push([Ryan, John, 0]); //Ryan lost against John
matches.push([Ryan, Mary, 0.5]); //A draw between Ryan and Mary
ranking.updateRatings(matches);

console.log("Ryan new rating: " + Ryan.getRating());
console.log("Ryan new rating deviation: " + Ryan.getRd());
console.log("Ryan new volatility: " + Ryan.getVol());
