var app=angular.module('myApp', ['mgcrea.ngStrap']);
app.controller('myCtrl',function($scope,$http) {

	$http({
		url: 'http://bitwise.mybluemix.net/getMapDataPrior',
		method: "GET",
		
	}).success(function(data, status, headers, config) {
		//console.log(data);
		
	});
$scope.selectedState = "";
$scope.states = ["What Are Bitcoins?",
				"How Do I Acquire Bitcoins?",
				"How to transfer Bitcoins",
				"What are the uses of Bitcoin",
				"Who Developed The Idea Of Bitcoins?",
				"What Is So Special About the Bitcoin System?",
				"What is Double Spending?",
				"How do you use Bitcoins?",
				"What’s Bitcoin Mining?",
				"How Do You Spend A Bitcoin?",
				"What about Bitcoin and taxes?",
				"Who is Satoshi Nakomoto?",
				"What is the Blockchain?"]
});