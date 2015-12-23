var myApp = angular.module('myApp', []);

myApp.controller('AppController', ['$scope', '$http', '$location', function($scope, $http, $location){
	$http.get('/clients').success(function(response){
		console.log('Data recieved from the server');
		$scope.clients = response;
	});
}]);