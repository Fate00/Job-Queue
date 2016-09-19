angular.module('myapp').controller('jobController', function($scope, Service, $location) {

	$scope.description = '';
	$scope.alerts = [];
	$scope.statusAlerts = [];

	$scope.submit = function() {

		if ($scope.description == '') {

			var alert = {};
			alert.type = "warning";
			alert.msg = "Please input the description.";
			$scope.alerts.push(alert);

		} else {

			Service.submitJob($scope).then(function(res) {
				$scope.description = '';
				var alert = {};
				alert.type = "success";
				alert.msg = "Congratulations! You job id is " + res.id;
				$scope.alerts.push(alert);
			}, function(err) {
				$scope.description = '';
				var alert = {};
				alert.type = "warning";
				alert.msg = "Oops! Something happened: " + err;
				$scope.alerts.push(alert);
			});

		}		
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	}

	$scope.checkStatus = function(jobId) {

		if (jobId == null) {

			var alert = {};
			alert.type = "warning";
			alert.msg = "Please input the job id.";
			$scope.statusAlerts.push(alert);

		} else if (!(!isNaN(parseFloat(jobId)) && isFinite(jobId))) {

			var alert = {};
			alert.type = "warning";
			alert.msg = "Please input a valid number.";
			$scope.statusAlerts.push(alert);

		} else {

			Service.getStatus(jobId).then(function(res) {
				$scope.jobId = '';
				var alert = {};
				alert.type = "success";
				alert.msg = "You job status is: " + res;
				$scope.statusAlerts.push(alert);
			}, function(err) {
				$scope.jobId = '';
				var alert = {};
				alert.type = "warning";
				alert.msg = err.data;
				$scope.statusAlerts.push(alert);
			});

		}		
	}

	$scope.closeStatusAlert = function(index) {
		$scope.statusAlerts.splice(index, 1);
	}

	$scope.changeView = function() {
		$location.path('/status');
	}
});

angular.module('myapp').controller('listController', function($scope, Service, $location, list, $route) {
	$scope.flag = false;
	$scope.alerts = [];
	$scope.index = 0;
	$scope.jobList = [];

	$scope.newStatus = {};
	$scope.allStatus = [
				{value : "Not complete"},
				{value : "Completed"},
				{value : "Discard"}
			];

	$scope.$on("$routeChangeError", function(angularEvent, current, previous, err) {
		var alert = {};
		alert.type = "warning";
		alert.msg = "Oops, some error happened: " + err.data;
		$scope.alerts.push(alert);
	});

	$scope.$on("$routeChangeSuccess", function(angularEvent, current, previous) {
		$scope.jobList = list;
		
	});

	$scope.changeStatus = function(index) {
		$scope.jobId = $scope.jobList[index].id;
		$scope.description = $scope.jobList[index].description;
		$scope.index = index;
		$scope.flag = true;
	}

	$scope.cancel = function() {
		$scope.flag = false;
	}

	$scope.edit = function() {
		if ($scope.newStatus == "Not complete") {

			$scope.flag = false;

		} else {

			var id = $scope.jobList[$scope.index].id;
			Service.editStatus(id, $scope.newStatus.status).then(function(res) {
				$scope.jobList[$scope.index].status = $scope.newStatus.status;
				$scope.flag = false;
			}, function(err) {
				var alert = {};
				alert.type = "warning";
				alert.msg = "Oops, some error happened: " + err.data;
				$scope.statusAlerts.push(alert);
			});

		}
	}

	$scope.changeView = function() {
		$location.path('/');
	}
});