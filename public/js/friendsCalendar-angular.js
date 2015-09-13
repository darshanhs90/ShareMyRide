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



		$http.post('./php/php_get_all_apps.php', {'UserName':$scope.UserName}
			).success(function(data, status, headers, config) {
				console.log(data);
				$scope.events=data;
				$scope.event=[];
				for (var i = $scope.events.length-1; i >= 0; i--) {
					var obj={'id':999,
						'Title':$scope.events[i].UserName+' has an appointment from'+ $scope.events[i].Origin +' to '+$scope.events[i].Destination,
						'start':'2015-0'+$scope.events[i].Month+'-'+$scope.events[i].Date+'T'+$scope.events[i].Time+':00:00'};
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
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    a
                }
                $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [ $scope.event
            /*{
            	id: 999,
            	title: 'Repeating Event',
            	start: '2015-09-16T16:00:00'
            },
            {
            	title: 'Pre Book Uber after Meeting',
            	start: '2015-09-13T10:30:00',
            	end: '2015-09-13T11:30:00'
            },
            {
            	title: 'Leave for Lunch',
            	start: '2015-09-18T12:00:00'
            },
            {
            	title: 'Person B booked Uber from A to B',
            	start: '2015-09-22T14:30:00'
            },
            {
            	title: 'Happy Hour',
            	start: '2015-09-24T17:30:00'
            },
            {
            	title: 'Book Uber for Dinner',
            	start: '2015-09-26T20:00:00'
            },
            {
            	title: 'Book Uber for Birthday Party',
            	start: '2015-09-21T07:00:00'
            }*/
            ]
        });
}).error(function(data, status) { 
	alert("Error While Updating,Try Again");
});
});

	/*$http({
		url: 'https://login.uber.com/oauth/authorize?response_type=code&client_id=LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi',
		method: "GET"
	}).success(function(data, status, headers, config) {
		console.log(data);		
		//window.location.replace("C:/Users/darshan/Desktop/ShareMyRide/index1.html");
		//$scope.a=$sce.trustAsHtml(data);
		});
		window.location.replace('https://login.uber.com/oauth/authorize?response_type=code&client_id=LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi');
		*/
	});