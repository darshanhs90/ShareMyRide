var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$sce) {
	console.log('herer');
	$scope.names=['Jani','Hege','Kai'];
	$scope.piclink;
	$scope.myProf='';
	var page = "http://localhost:1337/getProfile";
	$scope.UserName='';
	$http.get(page)
	.success(function(response) {
		console.log(response);
		$scope.myProf=response;
		$scope.UserName=$scope.myProf.first_name;
		$scope.imglink=$scope.myProf.picture;
		console.log($scope.UserName);
	//get my friends
//done
	$http.get('http://localhost:1337/php_get_all_friends?UserName='+$scope.UserName)
	.success(function(data, status, headers, config) {
			console.log(data);
			$scope.names=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
		});
	});


$scope.getAllFriends=function(){

	$http.get('http://localhost:1337/php_get_all_friends?UserName='+$scope.UserName)
	.success(function(data, status, headers, config) {
			console.log(data);
			$scope.names=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
		});
}



//on entering emailid get my friends

$scope.addFriend=function($val){


	$http.get('http://localhost:1337/php_add_friend?UserName='+$scope.UserName+'&FriendName='+$scope.emailid)
	.success(function(data, status, headers, config) {
			alertify.success($scope.emailid+' has been added as a friend successfully');
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
			$scope.getAllFriends();
			$scope.$apply();
		});
	}

 //delete friends


 $scope.deleteFriend=function($val){
 	$http.get('http://localhost:1337/php_delete_friend?UserName='+$scope.UserName+'&FriendName='+$scope.names[$val].FriendName)
 	.success(function(data, status, headers, config) {
 		if(data.length>1)
 			console.log(data);
 			$scope.getAllFriends();
 		}).error(function(data, status) { 
 			alert("Error While Updating,Try Again");
 		});
 	}

//get appointments
$scope.trips='';
$scope.getTrips=function($val){
	var d = new Date();
	var n = d.getMonth();
	n=n+1;
	$http.get('http://localhost:1337/php_get_user_apps?UserName='+$scope.names[$val].FriendName+'&Month='+n)
	.success(function(data, status, headers, config) {
			console.log(data);
			if(data.length>0)
				$scope.trips=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");

		});
	}


});