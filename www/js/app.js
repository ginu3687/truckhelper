// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var ApolloLite = angular.module('starter', ['ionic','ngCordova']);

ApolloLite.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	// window.geofence is now available
    window.geofence.initialize().then(function () {
        console.log("Successful initialization");
		alert("geo fence registered success");
    }, function (error) {
        console.log("Error", error);
		alert("geo fence register failed");
    });
	
	//geofence codes:
	if(window.geofence=== undefined){
		alert("geo fence not defined");
	}
	else {
		alert("geofence intiliased");
	}
	
	var onSuccess = function(position) {

			console.log('Latitude: '+ position.coords.latitude+ '\n' +
              'Longitude: '+ position.coords.longitude );
	};
	
	function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	window.geofence.addOrUpdate({
					id: 'abc', 
					latitude: 36.3337476, 
					longitude: -94.24866659999999, 
					radius: 100, 
					transitionType: 3, 
					notification: {         //Notification object
						id:             1, //optional should be integer, id of notification
						title:          "geo fence 1", //Title of notification
						text:           "entered geo fence 1", //Text of notification
						openAppOnClick: false,//is main app activity should be opened after clicking on notification
						vibration:      [5000], //Optional vibration pattern - see description
						data:           {
										name: 'foo',
										lastName: 'bar'
									}
					}
				}).then(function () {
					alert('Geofence successfully added');
				}, function (reason) {
					alert('Adding geofence failed', reason);
				});
				
				

				//listen for geofences
				window.geofence.onTransitionReceived = function(geofences) {
					geofences.forEach(function(geo) {
						console.log('Geofence transition detected', geo);
						alert('Geofence transition detected: ' + geo);
					});
				};
				
				

  });
})

ApolloLite.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('gps',{
      url:'/gps',
      templateUrl: 'gps.html',
      controller: 'gpsCntrl'
    })
    .state('home',{
      url:'/home',
      templateUrl: 'home.html',
      controller: 'homeCntrl'
    });

  $urlRouterProvider.otherwise('/home');
})
