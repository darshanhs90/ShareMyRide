var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$sce) {
	console.log('herer');
	$scope.a='';

	var page = "http://localhost:1337/getProfile";
	$scope.UserName='';
	$http.get(page)
	.success(function(response) {
		console.log(response);
		$scope.myProf=response;
		$scope.UserName=$scope.myProf.first_name;
		$scope.imglink=$scope.myProf.picture;


		$http.get('http://localhost:1337/php_get_all_apps?UserName='+$scope.UserName)
		.success(function(data, status, headers, config) {
			console.log(data);
			$scope.events=data;
			$scope.event=[];
			for (var i = $scope.events.length-1; i >= 0; i--) {
				$scope.events[i].Month-=1;
				//$scope.events[i].Date=parseInt($scope.events[i].Date)+1;
				
				if($scope.events[i].Time>12)
					$scope.events[i].Time-=12;
				if($scope.events[i].Month<10)
					$scope.events[i].Month='0'+$scope.events[i].Month;
				if($scope.events[i].Date<10)
					$scope.events[i].Date='0'+$scope.events[i].Date;




				var obj={'id':999,
				'title':$scope.events[i].UserName+' has an appointment from '+ $scope.events[i].Origin +' to '+$scope.events[i].Destination,
				'start':'2015-'+$scope.events[i].Month+'-'+$scope.events[i].Date+'T'+$scope.events[i].Time+':00'};
				//console.log(obj.title);
				console.log(obj.start);

				$scope.event.push(obj);
			};










			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultDate: '2015-09-12',
				selectable: true,
				selectHelper: true,
				select: function(start, end) {
					var title = prompt('Event Title:');
					var eventData;
					if (title) {
						eventData = {
							title: title,
							start: start,
							end: end
						};
						console.log(eventData);	
						var str=eventData.end._d.toString().split(" ");
						var date=str[2];
						date=date-1;
						var month=eventData.end._i;
						console.log(month);
						month=month[2];//:eventData.end._i.substring(5,7);
						if(month<10)
							month='0'+month;
						if(date<10)
							date='0'+date;
						var time=str[4].substring(0,5);

						console.log(time);
						console.log(time.substring(0,2));
						if(parseInt(time.substring(0,2))>11){
							console.log('*********');
							console.log(time.substring(0,2));
							time=parseInt(time.substring(0,2))-11;
							time='0'+time+':00';
						}
						date+=1;
						console.log(date);
						console.log(time);
						console.log(month);

						$http.get('http://localhost:1337/php_add_my_apps?UserName='+$scope.UserName+'&Destination='+eventData.title+'&Date='+date+'&Month='+month+'&Origin=Dallas&Time='+time)
						.success(function(data, status, headers, config) {
							console.log(data);

						});
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    
                }
                $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events:  $scope.event});
					}).error(function(data, status) { 
						alert("Error While Updating,Try Again");
					});
				});

});