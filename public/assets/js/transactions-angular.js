var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.transactions=[];
	console.log('herer');
	var options = {
		bg: 'red',

	// leave target blank for global nanobar
	target: '',

	// id for new nanobar
	id: 'mynano'
};

var nanobar = new Nanobar( options );

nanobar.go(45);
$http({
	url: 'http://api.reimaginebanking.com:80/enterprise/transactions?key=a7e63559418eb419cd29301d32626843',
	method: "GET"
}).success(function(data, status, headers, config) {console.log(data);

	nanobar.go(65);
	$scope.transactions=data;
	var newData=[];
	var depositAmount=0;
	var withdrawAmount=0;

	for (var i = 0; i <data.length; i++) {
		if(data[i].type=='deposit')
		{
			depositAmount+=data[i].amount;
		}
		else{
			withdrawAmount+=data[i].amount;
		}
	};
	withdrawAmount=withdrawAmount/(depositAmount+withdrawAmount);
	depositAmount=100-withdrawAmount;
	newData.push({label: "Withdrawals in %", value: withdrawAmount.toPrecision(4)});
	newData.push({label: "Deposits in %", value: depositAmount.toPrecision(4)});


	Morris.Donut({
		element: 'donut-example',
		data: newData
	});

	nanobar.go(100);
});

});