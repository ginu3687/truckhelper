// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,
	$window,
    $document,
    $ionicLoading,
    $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	if (window.geofence === undefined) {
		alert("geo not found");
	}
	else{
		alert("intiliase geo fence");
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
