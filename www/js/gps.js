/**
 * Created by jayesh on 2/3/16.
 */
ApolloLite.controller('gpsCntrl', function($scope,$rootScope, $state, $cordovaGeolocation) {

 // $rootScope.test = "testing";
	var options = {timeout: 10000, enableHighAccuracy: true};
	 
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
		var mapOptions = {
		  center: latLng,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	 
		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	 
	  }, function(error){
		console.log("Could not get location");
	  });


})



ApolloLite.controller('homeCntrl', function($rootScope, $cordovaGeolocation) {

    $rootScope.driver = "Alex Jacobson";
    $rootScope.teleNmbr = "675-567-7865";
    $rootScope.item = "WM300456789";
    $rootScope.weight = "3000lbs";
    $rootScope.deliverydate = "03/02/2016";
    $rootScope.truckNo = "AR56738";
    //watching the change in position of the driver
    $rootScope.gpsCoordinates = [];
    var watchOptions = {timeout: 3000, enableHighAccuracy: false};
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(null, function (err) {
      console.log(err)
    }, function (position) {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var gpsArray = {Latvalue: lat, Longvalue: long}
      $rootScope.latitude = lat
      $rootScope.longitude = long
      $rootScope.gpsCoordinates.push(gpsArray)

      console.log("watching position.." + lat + '..' + long)


    });

    //watch.clearWatch();

//get the current position of the driver

    /*var posOptions = {timeout: 10000, enableHighAccuracy: false};
     $cordovaGeolocation
     .getCurrentPosition(posOptions)
     .then(function (position) {
     var lat  = position.coords.latitude
     var long = position.coords.longitude
     $scope.latitude=lat
     $scope.longitude=long
     console.log("currentposition.."+lat + '...' + long)
     }, function(err) {
     console.log("error--"+err);
     });*/
  //});
})
