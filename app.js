var settings = {
  // tau : 'Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy.'
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

console.log('Ryan new rating: ' + Ryan.getRating());
console.log('Ryan new rating deviation: ' + Ryan.getRd());
console.log('Ryan new volatility: ' + Ryan.getVol());


function ExperiencePair(experience1, experience2) {
  this.experience1 = experience1;
  this.experience2 = experience2;
  this.winner = 0.5;
};



var app = angular.module('gShe', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/admin', {
    templateUrl: 'admin.html',
    controller: 'AdminController'
  }).otherwise({
    templateUrl: 'experiences.html',
    controller: 'ExperienceController'
  });
}]);

app.controller('ExperienceController', function($scope, $firebase) {
  var ref = new Firebase('https://g-she.firebaseio.com/experiences/');
  var sync = $firebase(ref);

  $scope.experiences = sync.$asArray();

  $scope.batch = [];
  $scope.eligibleExperiences = [];
  $scope.experienceCounter = 0;

  $scope.experiencePairs = [];
  $scope.experiencePairCounter = 0;

  $scope.hadExperience = function(experience) {
    $scope.eligibleExperiences.push(experience);
    $scope.nextExperience();
  };

  $scope.nextExperience = function() {
    $scope.experienceCounter++;
    if($scope.experienceCounter == $scope.experiences.length) {
      $scope.allExperiencesAnswered = true;
      $scope.experiencePairs = createExperiencePairs();
    }
  };

  $scope.nextExperiencePair = function(experiencePair, winner) {
    experiencePair.winner = winner;
    $scope.experiencePairCounter++;
  };

  function createExperiencePairs() {
    var experiencePairs = [];
    
    for(var i = 0; i < $scope.eligibleExperiences.length; i++) {
      for(var j = i + 1; j < $scope.eligibleExperiences.length; j++) {
        experiencePairs.push(new ExperiencePair($scope.eligibleExperiences[i], $scope.eligibleExperiences[j]));
      }
    }

    return experiencePairs;
  };
});
