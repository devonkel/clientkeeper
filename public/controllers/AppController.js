var myApp = angular.module('myApp', []);

myApp.controller('AppController', ['$scope', '$http', '$location', function ($scope, $http, $location){
	$http.get('/clients').success(function (response){
		console.log('Data recieved from the server');
		$scope.clients = response;
	});

	$scope.addClient = function (){
		console.log('Adding new client...');
		$http.post('/clients', $scope.client).success(function (response){
			console.log('Client Added');
			window.location.href = '/';
		});
	};

	$scope.editClient = function (id){
		console.log('Editing client...');
		$('#addBtn').remove();
		// $('#updateBtn').show();
		$http.get('/clients/'+id).success(function (response){
			$scope.client = response;
		});
	};

	$scope.updateClient = function(id){
		$http.put('/clients/'+$scope.client._id, $scope.client).success(function(response){
			console.log('Client updated');
			window.location.href = '/';
		});
	};

	$scope.deleteClient = function (id){
		$http.delete('/clients/'+id).success(function (response){
			console.log('Client Deleted');
			window.location.href = '/';
		});
	};
}]);