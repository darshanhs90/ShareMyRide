var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

	$http({
		url: 'http://bitwise.mybluemix.net/getMapDataPrior',
		method: "GET"
	}).success(function(data, status, headers, config) {console.log(data);
		
		
	});
});