var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    var bitValue = '';
    $scope.startDate='';
    $scope.endDate='';
    var options = {
        bg: 'red',

    // leave target blank for global nanobar
    target: '',

    // id for new nanobar
    id: 'mynano'
};

var nanobar = new Nanobar( options );



setInterval(function() {
    $http({
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        method: "GET"
    }).success(function(data, status, headers, config) {
        if (data.bpi.USD.rate != bitValue) {
            if (data.bpi.USD.rate - bitValue > 0)
                alertify.success('The changed Bit coin value for 1 USD is ' + data.bpi.USD.rate);
            else
                alertify.error('The changed Bit coin value for 1 USD is ' + data.bpi.USD.rate);
            bitValue = data.bpi.USD.rate;
        }
    });
}, 1000);
$scope.generateChart = function(startDate, endDate) {
    nanobar.go(45);
 var startDate=(new Date($scope.startDate).toISOString().split('T')[0]);
 var endDate=(new Date($scope.endDate).toISOString().split('T')[0]);

 if($scope.startDate=='' || $scope.endDate==''){
    alertify.error('Error : Select start and end date before generating bit chart');
}
else{

    $http({
        url: 'http://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + endDate,
        method: "GET"
    }).success(function(data, status, headers, config) {
        nanobar.go(45);
        var keys = [];
        var labelsValue = [];
        for (var key in data.bpi) {
            keys.push(key);
            labelsValue.push(data.bpi[key]);
        }



        var chart = new Chartist.Line('.ct-chart', {
            labels: keys,
            series: [
            labelsValue
            ]
        }, {
            low: 0
        });

                // Let's put a sequence number aside so we can use it in the event callbacks
                var seq = 0,
                delays = 20,
                durations = 20;

                // Once the chart is fully created we reset the sequence
                chart.on('created', function() {
                    seq = 0;
                });

                // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
                chart.on('draw', function(data) {
                    seq++;

                    if (data.type === 'line') {
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
                    } else if (data.type === 'label' && data.axis === 'x') {
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
                    } else if (data.type === 'label' && data.axis === 'y') {
                        data.element.animate({
                            x: {
                                begin: seq * delays,
                                dur: durations,
                                from: data.x - 100,
                                to: data.x,
                                easing: 'easeOutQuart'
                            }
                        });
                    } else if (data.type === 'point') {
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
                    } else if (data.type === 'grid') {
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
nanobar.go(100);
});
}
}
//$scope.generateChart('2013-01-01', '2013-12-25');
});