var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$sce) {
	console.log('herer');
	$scope.names=['Jani','Hege','Kai'];
	$scope.myProf='';
	var page = "http://localhost:1337/getProfile";
	$scope.UserName='';
	$http.get(page)
	.success(function(response) {
		console.log(response);
		$scope.myProf=response;
		$scope.UserName=$scope.myProf.first_name;
	//get my friends

	$http.post('./php/php_get_all_friends.php', {'UserName':$scope.UserName}
		).success(function(data, status, headers, config) {
			console.log(data);
			$scope.names=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
		});
	});


$scope.getAllFriends=function(){

$http.post('./php/php_get_all_friends.php', {'UserName':$scope.UserName}
		).success(function(data, status, headers, config) {
			console.log(data);
			$scope.names=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
		});
	});





}



//on entering emailid get my friends

$scope.addFriend=function($val){


	$http.post('./php/php_add_friend.php', {'UserName':$scope.UserName,'FriendName':$scope.names[$val].UserName}
		).success(function(data, status, headers, config) {
			alert(data);
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");
			$scope.getAllFriends();
		});
	}

 //delete friends


 $scope.deleteFriend=function($val){
 	$http.post('./php/php_delete_friend.php', {'UserName':$scope.UserName,'FriendName':$scope.names[$val].UserName}
 		).success(function(data, status, headers, config) {
 			alert(data);
 			$scope.getAllFriends();
 		}).error(function(data, status) { 
 			alert("Error While Updating,Try Again");
 		});
 	}

//get appointments
$scope.trips='';
$scope.getApps=function($val){
	var d = new Date();
	var n = d.getMonth();
	$http.post('./php/php_get_user_apps.php', {'UserName':$scope.names[$val].UserName,'Month':n+1}
		).success(function(data, status, headers, config) {
			alert(data);
			$scope.trips=data;
		}).error(function(data, status) { 
			alert("Error While Updating,Try Again");

		});
	}


});