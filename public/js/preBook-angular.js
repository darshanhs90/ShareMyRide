var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $sce) {
    console.log('herer');
    $scope.a = '';
    var page = "http://localhost:1337/getProfile";
    $scope.UserName = '';
    $http.get(page)
        .success(function(response) {
            console.log(response);
            $scope.myProf = response;
            $scope.UserName = $scope.myProf.first_name;


        });




    var start_lat, start_long, end_lat, end_long = '';
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
             
             $http.get('http://localhost:1337/getProducts', {
                 'latitude': start_lat,
                 'longitude': start_long
             }).success(function(data, status, headers, config) {
                 alert(data);
                 $scope.vehicles = data;
             }).error(function(data, status) {
                 alert("Error While Updating,Try Again");

             });
         }).error(function(data, status) {
             alert("Error While Updating,Try Again");

         });

    }

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
            $http.get('http://localhost:1337/getPrice', {
                'start_lat': start_lat,
                'start_long': start_long,
                'end_lat': end_lat,
                'end_long': end_long
            }).success(function(data, status, headers, config) {
                alert(data);
                $scope.fare = data;
            }).error(function(data, status) {
                alert("Error While Updating,Try Again");
            });
        }).error(function(data, status) {
            alert("Error While Updating,Try Again");

        });



    }

    $scope.checkFriends = function() {

        var d = new Date();
        var m = d.getmonth();
        $http.get('http://localhost:1337/checkFriends', {
            'UserName': $scope.UserName,
            'Month': d + 1
        }).success(function(data, status, headers, config) {
            alert(data);
            $scope.friendsApps = data;
        }).error(function(data, status) {
            alert("Error While Updating,Try Again");
        });
    }



    $scope.confirmBooking = function() {
        var prodId = $scope.vehicles.products[0].product_id;
        $http.get('http://localhost:1337/makeRequest', {
            'start_lat': start_lat,
            'start_long': start_long,
            'end_lat': end_lat,
            'end_long': end_long,
            'product_id': prodId
        }).success(function(data, status, headers, config) {
            alert(data);
            $scope.friendsApps = data;
        }).error(function(data, status) {
            alert("Error While Updating,Try Again");
        });
    }




});