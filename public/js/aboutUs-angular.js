var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$sce) {
	console.log('herer');
	$scope.a='';
	/*$http({
		url: 'https://login.uber.com/oauth/authorize?response_type=code&client_id=LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi',
		method: "GET"
	}).success(function(data, status, headers, config) {
		console.log(data);		
		//window.location.replace("C:/Users/darshan/Desktop/ShareMyRide/index1.html");
		//$scope.a=$sce.trustAsHtml(data);
		});
		window.location.replace('https://login.uber.com/oauth/authorize?response_type=code&client_id=LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi');
	*/
});