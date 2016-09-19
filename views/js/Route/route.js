angular.module('myapp').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        	.when('/', {
        		templateUrl: 'job.html',
                controller: 'jobController'
        	})

        	.when('/status', {
        		templateUrl: 'status.html',
        		controller: 'listController',
        		resolve: {
        			list: function(Service, $q) {
        				return Service.getList().then(function(data) {
        					return data;
        				}, function(err) {
        					return $q.reject(err);
        				});
        			}
        		}
        	});            
    }
]);