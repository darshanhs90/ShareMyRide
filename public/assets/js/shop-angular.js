var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.ebayData='';//[{galleryURL: "http://thumbs4.ebaystatic.com/m/mwoSIggB1EWGMsYwvdvvIdg/140.jpg",title:'asdasd'}];
	$scope.searcher='';
	// $http({
	// 	url: 'http://localhost:1337/ebaySearch',
	// 	method: "GET"
	// }).success(function(data, status, headers, config) {
	// 	console.log(data);
	// 	$scope.ebayData=data;
	// });

	var options = {
		bg: 'red',

	// leave target blank for global nanobar
	target: '',

	// id for new nanobar
	id: 'mynano'
};

var nanobar = new Nanobar( options );



swal({   title: "Search!",   text: "Use the Search to search the ebay store to buy.",   timer: 2000,   showConfirmButton: false });
$scope.pagenum=1;
$scope.searchItem=function(){
	nanobar.go(20);
	$scope.pagenum=1;
	$http({
		url: 'http://bitwise.mybluemix.net/ebaySearch',
		method: "GET",
		params:{itemname:$scope.searcher}
	}).success(function(data, status, headers, config) {
		console.log(data);
		nanobar.go(55);
		$http({
			url: 'http://bitwise.mybluemix.net/ebaySearch1',
			method: "GET",
			params:{itemname:$scope.searcher}
		}).success(function(data, status, headers, config) {
			   nanobar.go(75);
			$scope.ebayData=data;
			nanobar.go(100);
		});
	});
}



$scope.fetchNewResults=function(){
	nanobar.go(45);
$http({
		url: 'http://bitwise.mybluemix.net/ebaySearch2',
		method: "GET",
		params:{pagenum:$scope.pagenum}
	}).success(function(data, status, headers, config) {
		console.log(data);
			$scope.ebayData=data;
			nanobar.go(100);
	});
	//$scope.pagenum=$scope.pagenum+1;
}

$scope.buyItem=function($val){
nanobar.go(45);
$http({
		url: 'http://bitwise.mybluemix.net/setItem',
		method: "GET",
		params:{index:$val}
	}).success(function(data, status, headers, config) {
		
		nanobar.go(100);
		window.location.replace('./pay.html');
	});


}
});