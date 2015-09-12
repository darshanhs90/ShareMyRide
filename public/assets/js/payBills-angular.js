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
nanobar.go(45);
	$scope.bills='';
	$http({
		url: 'http://api.reimaginebanking.com:80/enterprise/bills?key=a7e63559418eb419cd29301d32626843',
		method: "GET",
		params:{itemname:$scope.searcher}
	}).success(function(data, status, headers, config) {
		//console.log(data);
		nanobar.go(75);
		$scope.bills=data;
		nanobar.go(100);
	});


	$scope.paypalPay=function($val){
		nanobar.go(65);
		$http({
			url: 'http://bitwise.mybluemix.net/setPrice',
			method: "GET",
			params:{price:$scope.bills[$val].payment_amount}
		}).success(function(data, status, headers, config) {
			nanobar.go(100);
			//console.log(data);
			window.location.replace('./dropin.html');
		});
	}

	$scope.bitcoinPay=function($val){
		nanobar.go(45);
		$http({
			url: 'http://bitwise.mybluemix.net/sendBitcoin',
			method: "GET",
			params:{amount:0.0001}
		}).success(function(data, status, headers, config) {
			nanobar.go(65);
			if(data.error==undefined)
				alertify.success('Bill Payment Successful using bit coin with tx_hash : '+data.tx_hash);
			else{
				alertify.error('Bill Payment Unsuccessful due to insufficient funds');
			}
			nanobar.go(100);
		});





	}




});