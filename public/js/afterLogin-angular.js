var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$sce) {
	$scope.a='';
  $scope.picLink='';
var lat,longt;



















	$http({
		url: 'http://localhost:1337/getHistory',
		method: "GET"
	}).success(function(data, status, headers, config) {
		console.log(data);		
		var keys = [];
		var labelsValue = [];
		var hist=data.history;
		for (var i = 0; i <24; i++) {
			keys.push((hist[i].start_time-hist[i].request_time)/100+'m');
			labelsValue.push(hist[i].distance);
		};
		var chart = new Chartist.Line('.ct-chart', {
      labels: keys,
      series: [labelsValue]
    }, {
      low: 0
    });

// Let's put a sequence number aside so we can use it in the event callbacks
var seq = 0,
delays = 80,
durations = 50;

// Once the chart is fully created we reset the sequence
chart.on('created', function() {
  seq = 0;
});

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
chart.on('draw', function(data) {
  seq++;

  if(data.type === 'line') {
    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
    data.element.animate({
      opacity: {
        // The delay when we like to start the animation
        begin: seq * delays + 1000,
        // Duration of the animation
        dur: durations,
        // The value where the animation should start
        from: 0,
        // The value where it should end
        to: 1
      }
    });
  } else if(data.type === 'label' && data.axis === 'x') {
    data.element.animate({
      y: {
        begin: seq * delays,
        dur: durations,
        from: data.y + 100,
        to: data.y,
        // We can specify an easing function from Chartist.Svg.Easing
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'label' && data.axis === 'y') {
    data.element.animate({
      x: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 100,
        to: data.x,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      x2: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
    // Using data.axis we get x or y which we can use to construct our animation definition objects
    var pos1Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '1'] - 30,
      to: data[data.axis.units.pos + '1'],
      easing: 'easeOutQuart'
    };

    var pos2Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '2'] - 100,
      to: data[data.axis.units.pos + '2'],
      easing: 'easeOutQuart'
    };

    var animations = {};
    animations[data.axis.units.pos + '1'] = pos1Animation;
    animations[data.axis.units.pos + '2'] = pos2Animation;
    animations['opacity'] = {
      begin: seq * delays,
      dur: durations,
      from: 0,
      to: 1,
      easing: 'easeOutQuart'
    };

    data.element.animate(animations);
  }
});


});


$http({
  url: 'http://localhost:1337/setProfile',
  method: "GET"
}).success(function(data, status, headers, config) {
  console.log(data);
  $scope.imglink=data.picture;
  console.log(data.first_name);

$http.get('http://localhost:1337/sendphp?UserName='+data.first_name+'&Emailid='+data.email+'&PicLink='+data.picture)
.success(function(data, status, headers, config) {
      console.log(data);
      $scope.names=data;
    }).error(function(data, status) { 
      alert("Error While Updating,Try Again");
    });
  });
navigator.geolocation.getCurrentPosition(GetLocation);
function GetLocation(location) {
    lat=(location.coords.latitude);
    longt=(location.coords.longitude);
    console.log(lat);
    lat="32.961790";
    longt="-96.829169";
$http({
    url: 'http://localhost:1337/getTimeEstimate?start_lat='+lat+'&start_long='+longt,
    method: "GET"
  }).success(function(data, status, headers, config) {
console.log('here');
console.log(data);

var dta=[];
for (var i = 0; i <data.times.length-1; i++) {
  var obj={y:data.times[i].display_name,a:data.times[i].estimate/100}
  dta.push(obj);
};


Morris.Bar({
  element: 'bar-example',
  data: dta,
  xkey: 'y',
  ykeys: ['a'],
  labels: ['Time Estimate']
});





  });
}









});