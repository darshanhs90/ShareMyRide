var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $sce) {
    console.log('herer');



    var start_lat='';
    var start_long='';
    var end_lat='';
    var end_long = '';


    $scope.a = '';
    $scope.imglink='';
    var page = "http://localhost:1337/getProfile";
    $scope.UserName = '';
    $http.get(page)
    .success(function(response) {
        console.log(response);
        $scope.myProf = response;
        $scope.UserName = $scope.myProf.first_name;
        $scope.imglink=$scope.myProf.picture;

    });




    $scope.vehicles = '';
    $scope.getVehicles = function() {
        console.log(document.getElementById("orgn").value);
        console.log($scope.origin);
        var url='';
        if(document.getElementById("orgn").value==$scope.origin){

            url='https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.origin + '&key=AIzaSyBM37mzZGnCNzUqLfhs2s_A5oJEAPk5Xl4';
        }
        else{
            var x=document.getElementById("orgn").value.toString();
            x=x.split("lng:").join(',');
            x=x.split("lat").join('');
            console.log(x);


            url='https://maps.googleapis.com/maps/api/geocode/json?latlng' +x + '&key=AIzaSyBM37mzZGnCNzUqLfhs2s_A5oJEAPk5Xl4';
        }


        //get lat and long based on address entered
        //https://maps.googleapis.com/maps/api/geocode/json?address=7720,Mccallumblvd&key=AIzaSyBM37mzZGnCNzUqLfhs2s_A5oJEAPk5Xl4

        $http.get(url, {}).success(function(data, status, headers, config) {
           start_lat = data.results[0].geometry.location.lat;
           start_long = data.results[0].geometry.location.lng;
           console.log(start_lat);
           console.log(start_long);

           $http.get('http://localhost:1337/getProducts?latitude='+start_lat+'&longitude='+start_long)
           .success(function(data, status, headers, config) {
               console.log(data);
               $scope.vehicles = data;
           }).error(function(data, status) {
               alert("Error While Updating,Try Again");

           });
       }).error(function(data, status) {
           alert("Error While Updating,Try Again");

       });

   }

   $scope.showVehicles=true;
   $scope.getFare = function() {

       if(document.getElementById("dstn").value==$scope.destination){

        url='https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.origin + '&key=AIzaSyBM37mzZGnCNzUqLfhs2s_A5oJEAPk5Xl4';
    }
    else{
        var x=document.getElementById("dstn").value.toString();
        x=x.split("lng:").join(',');
        x=x.split("lat").join('');
        console.log(x);


        url='https://maps.googleapis.com/maps/api/geocode/json?latlng' +x + '&key=AIzaSyBM37mzZGnCNzUqLfhs2s_A5oJEAPk5Xl4';
    }








    $http.get(url, {}).success(function(data, status, headers, config) {
        end_lat == data.results[0].geometry.location.lat;
        end_long == data.results[0].geometry.location.lng;
        console.log(end_lat);
        console.log(end_long);
        $http.get('http://localhost:1337/getPrice?start_lat='+start_lat+'&start_long='+start_long+'&end_lat='+end_lat+'&end_long='+end_long)
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.fare = data;
            $scope.showVehicles=false;
        }).error(function(data, status) {
            alert("Error While Updating,Try Again");
        });
    }).error(function(data, status) {
        alert("Error While Updating,Try Again");

    });



}

$scope.checkFriends = function() {
    window.location.replace('./friendsCalendar.html');
   /* var d = new Date();
    var m = d.getMonth();
    $http.get('http://localhost:1337/checkFriends', {
        'UserName': $scope.UserName,
        'Month': m + 1
    }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.friendsApps = data;
    }).error(function(data, status) {
        alert("Error While Updating,Try Again");
    });*/
}



$scope.confirmBooking = function() {
    if($scope.dttime==undefined||$scope.eventname==undefined){
        console.log($scope.dttime);
        alertify.error('All parameters mandatory');
        return;
    }
    var prodId = $scope.vehicles.products[0].product_id;

    $http.get('http://localhost:1337/makeRequest', {
        'start_lat': start_lat,
        'start_long': start_long,
        'end_lat': end_lat,
        'end_long': end_long,
        'product_id': prodId
    }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.friendsApps = data;
        alertify.success('Booking successful');


        request.origin=$scope.origin;
        request.destination=$scope.destination;
        directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
  }
});




    }).error(function(data, status) {
        alert("Error While Updating,Try Again");
    });

//get name of origin
var Origin,Destination;
$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+start_lat+','+start_long+'&key=AIzaSyCd7puJZ01KdcVVBHQA1iVDIaH4EtuFSqQ')
.success(function(data, status, headers, config) {
    console.log(data);
    //if($scope.Origin==undefined)
    Origin=data.results[0].formatted_address;
    //else
      //  Origin=$scope.Origin;


      if(end_lat==undefined)
        end_lat=(start_lat);
    if(end_long==undefined)
        end_long=(start_long);
    console.log(start_lat);
    console.log(start_long);
    console.log(end_lat);
    console.log(end_long);





    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+start_lat+','+start_long+'&key=AIzaSyCd7puJZ01KdcVVBHQA1iVDIaH4EtuFSqQ')
    .success(function(data, status, headers, config) {

        console.log(data);

        if($scope.Destination==undefined)
            Destination=data.results[0].formatted_address;
        else
            Destination=$scope.Destination;

        var str=$scope.dttime.toString().split(" ");
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var Month=monthNames.indexOf(str[1]);
        var date=str[2];
        var time=str[4].substring(0,5);

        console.log(Month);
        console.log(Origin);
        console.log(Destination);
        console.log(date);
        console.log(time);







        $http.get('http://localhost:1337/php_add_my_apps?UserName='+$scope.UserName+'&Origin='+Origin+'&Destination='+Destination+'&Date='+date+'&Month='+Month+'&Time='+time)
        .success(function(data, status, headers, config) {
            console.log(data);


        });

    });



});



//get name of destination








}




});