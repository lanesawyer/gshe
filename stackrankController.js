app.controller('StackrankController', function($scope, $firebase) { 
  var ref = new Firebase('https://g-she.firebaseio.com/experiences/');
  var sync = $firebase(ref);

  $scope.stackrank = sync.$asArray();
});
