
var ApolloLite = angular.module('starter', ['ionic','ngCordova']);

ApolloLite.run(function($ionicPlatform,$cordovaLocalNotification,$ionicPopup) {
	$ionicPlatform.ready(function() {

		if(window.cordova && window.cordova.plugins.Keyboard) {
			
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
		
			StatusBar.styleDefault();
		}
	
		window.geofence.initialize().then(function () {
			console.log("Successful initialization");
		}, function (error) {
			console.log("Error", error);
		});
	
		if(window.geofence=== undefined){
			console.log("debugging -- window.geofence not available");
		}
		else {
			console.log("debugging -- window.geofence available");
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
			id: 'truckhelperarea', 
			latitude: 36.3337476, 
			longitude: -94.24866659999999, 
			radius: 10000, 
			transitionType: 3, 
			notification: {     
				id				:	1, 
				title			:	"Welcome to DC area",
				text			:	"You have enterd the Destination area. Load assigments will be notified soon!!!",
				openAppOnClick	:	true,
				vibration		:	[5000], 
				data			:	{
									name: 'DC 71132',
									lastName: 'NY'
								}
							}
		}).then(function () {
			var notifyTime = new Date();
			notifyTime.setMinutes(notifyTime.getMinutes() + 1);
			$cordovaLocalNotification.add({
				id: "1234",
				date: notifyTime,
				message: "Door Assigned",
				title: "Door : 3 North 12. Average Wait Time : 20 minutes. ",
				autoCancel: true,
				sound: null
			}).then(function () {
				console.log("The notification has been set");
			});
		}, function (reason) {
					
		});
				
				
		window.geofence.onTransitionReceived = function(geofences) {
			geofences.forEach(function(geo) {
				var alertPopup = $ionicPopup.alert({
					 title: 'Door Assigned',
					 template: 'Door : 3 North 12. Average Wait Time : 20 minutes. '
				   });

				   alertPopup.then(function(res) {
					 console.log('geo fence handled.');
				   });
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
