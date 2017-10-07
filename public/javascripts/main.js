var app = angular.module('myApp', ['ui.router']);
 	app.config(function($stateProvider)
	{
		$stateProvider
			.state('edit', {
				name: 'edit',
				url: '/edit',
				templateUrl: '/views/Edit.html'
			})

			.state('userlist', {
				name: 'userlist',
				url: '/userlist',
				templateUrl: '/views/UserList.html'
			})

			.state('addtask', {
				name: 'addtask',
				url: '/addtask',
				templateUrl: '/views/addtask.html'
			})
	})
	app.controller('myCtrl', function($scope, $state, $http) {
	    $scope.goToOtherState = function() {
	    	$state.go('userlist');
	    }
	    $scope.callService = function() {
	    	$state.go('addtask');
	    }



	    $scope.callTaskListDetails = function() {
	   	var url = '/task';
        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                
            }
        }).then(function(response) {
            $scope.listData = response;
            console.log($scope.listData)
        });
	    }
$scope.callTaskListDetails();

	    $scope.callTaskDetails = function(data) {
	   	var url = '/task/create';
        return $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                
            }
        }).then(function(response) {
            return  (
            	alert(response.data),
            	$state.go('userlist'),
            	$scope.callTaskListDetails()
            	)
        });
	    }

	    $scope.deleteTask = function(data) {
	   	var url = '/task/destroy/'+data;
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                
            }
        }).then(function(response) {
            return  (
            	alert(response.data),
            	$state.go('userlist'),
            	$scope.callTaskListDetails()
            	)
        });
	    }


	});