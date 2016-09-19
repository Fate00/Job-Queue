angular.module('myapp').factory('Service', function($http, $q) {
	
	var serviceObj = {

		submitJob: function($scope) {

			var deferred = $q.defer();
			var jobDescription = {
				description :  $scope.description
			};

			$http({
				method: 'POST',
				data: jobDescription,
				url: '/api/jobs'
			}).then(function(res) {
				deferred.resolve(res.data);
			}, function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},

		getStatus: function(id) {

			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: '/api/jobs/' + id
			}).then(function(res) {
				deferred.resolve(res.data);
			}, function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},

		getList: function() {

			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: '/api/jobs'
			}).then(function(res) {
				deferred.resolve(res.data);
			}, function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},

		editStatus: function(id, newStatus) {

			var deferred = $q.defer();
			var sendData = {
				id : id,
				status : newStatus
			};

			$http({
				method: 'PUT',
				url: '/api/jobs/' + id,
				data: sendData
			}).then(function(res) {
				deferred.resolve(res.data);
			}, function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}

	return serviceObj;
});