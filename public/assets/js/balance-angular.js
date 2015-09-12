var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	var options = {
		bg: 'red',

	// leave target blank for global nanobar
	target: '',

	// id for new nanobar
	id: 'mynano'
};

var nanobar = new Nanobar( options );
//nanobar.go(30);
$scope.exchangeRt='';
$scope.exchangeShow=false;
$scope.balanceShow=false;
$scope.getBalance=function(){
	nanobar.go(30);
	$scope.exchangeShow=false;
	$scope.balanceShow=true;
	$http({
		url: 'http://bitwise.mybluemix.net/getBalance',
		method: "GET",
		params:{itemname:$scope.searcher}
	}).success(function(data, status, headers, config) {
		$scope.balance=data;
			nanobar.go(60);
		if(data<10){
			alertify.error('Bit balance of '+data+'is considered to be too low');
		}
		else
			alertify.success('Maintain your Bit balance above 10.Your Balance is '+data);

	nanobar.go(100);

	});



}

$scope.getChartdata=function(){

	nanobar.go(30);
	$http({
		url: 'http://bitwise.mybluemix.net/getChartdata',
		method: "GET"
	}).success(function(data, status, headers, config) {
		
	nanobar.go(60);
		if(data=='')
			alertify.error('No Chart data Present');

	nanobar.go(100);
	});

}



$scope.getExchangeRates=function(){
	$scope.exchangeShow=true;
	$scope.balanceShow=false;

	nanobar.go(30);
	$http({
		url: 'http://bitwise.mybluemix.net/getExchangeRates',
		method: "GET"
	}).success(function(data, status, headers, config) {
		console.log(data); 

	nanobar.go(60);
		$scope.keys=[];
		$scope.values=[];

		for (var key in data) {
			$scope.keys.push(key);
			$scope.values.push(data[key]);
		}

	nanobar.go(100);
		console.log($scope.keys);
		console.log($scope.values);

	});

}



});