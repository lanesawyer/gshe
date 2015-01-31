app.controller('StackrankController', function($scope, $firebase, config) { 
  var ref = new Firebase(config.firebase_url + '/experiences/');
  var sync = $firebase(ref);

  $scope.stackrank = sync.$asArray();
});
