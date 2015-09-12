var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.payData = '';
    $scope.payFlag = '0';
    $scope.paymentFlag = '0';
    $scope.email1 = '';
    $scope.email2 = '';
    $scope.email3 = '';
    $scope.percent1 = '';
    $scope.percent2 = '';
    $scope.percent3 = '';
    $scope.price = '';
    $scope.prd=false;
    $scope.prf=false;
    $scope.mail='';
    $scope.amount='';
    
    $scope.prodOrder=function(){
        $scope.prd=true;
        $scope.prf=false;

    }


    $scope.payFriend=function(){
        $scope.prd=false;
        $scope.prf=true;
    }


    $http({
        url: 'http://bitwise.mybluemix.net/getItem',
        method: "GET"
    }).success(function(data, status, headers, config) {
        if (data != '0') {
            $scope.payData = data;
            $scope.price = parseInt(data.sellingStatus.currentPrice.USD)+parseInt(data.shippingInfo.shippingServiceCost.USD);
            $scope.prd=true;
        } else
        $scope.payData = '';
    });
    $scope.payFlag = function() {
        $scope.paymentFlag = '1';
    }

    $scope.paypalPay = function() {
        //pay using bitcoin
        window.location.replace('./dropin.html');
    }
    $scope.bitCoinPay = function() {
      
        $http({
            url: 'http://bitwise.mybluemix.net/sendBitcoin',
            method: "GET",
            params:{amount:0.0001}
        }).success(function(data, status, headers, config) {
          if(data.error==undefined)
            alertify.success('Payment Successful using bit coin with tx_hash : '+data.tx_hash);
        else{
            alertify.error('Payment Unsuccessful due to insufficient funds');
        }
    });
    }
    $scope.addRows = function() {
        $scope.addFlag = '1';
    }
    $scope.paymentFlagfn = function() {
        $scope.payFlag = '1';
    }
    $scope.sendMail = function() {
        if ($scope.email1 != '' && $scope.email2 != '' && $scope.email3 != '') {
            var total = $scope.percent1 + $scope.percent2 + $scope.percent3;
            if (total < 100 || total > 100) {
                alert('Sum of Split percentages should be 100');
            } else {
                //send mails
                $scope.message1 = 'Your friend has invited you to pay ' + ($scope.percent1 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://bitwise.mybluemix/pay.html';
                $scope.message2 = 'Your friend has invited you to pay ' + ($scope.percent2 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://bitwise.mybluemix/pay.html';
                $scope.message3 = 'Your friend has invited you to pay ' + ($scope.percent3 * $scope.price / 100) + 'USD for ' + $scope.payData.title + ' .The payment can be done from the following link http://bitwise.mybluemix/pay.html';

                $http({
                    url: 'http://bitwise.mybluemix.net/sendEmail',
                    method: "GET",
                    params: {
                        email: $scope.email1,
                        message: $scope.message1
                    }
                }).success(function(data, status, headers, config) {
                    $http({
                        url: 'http://bitwise.mybluemix.net/sendEmail',
                        method: "GET",
                        params: {
                            email: $scope.email2,
                            message: $scope.message2
                        }
                    }).success(function(data, status, headers, config) {

                        $http({
                            url: 'http://bitwise.mybluemix.net/sendEmail',
                            method: "GET",
                            params: {
                                email: $scope.email3,
                                message: $scope.message3
                            }
                        }).success(function(data, status, headers, config) {
                            alertify.success('Payment Mails sent successfully');
                        });
                    });
                });
            }
        } else {
            alert('Enter Valid email addresses');
        }
    }

    $scope.validate = function($val) {
        var message = '';
        if ($val == 1)
            message = 'User with mailid' + $scope.email1 + ' will be paying ' + ($scope.percent1 * $scope.price / 100);
        else if ($val == 2)
            message = 'User with mailid' + $scope.email2 + ' will be paying ' + ($scope.percent2 * $scope.price / 100);
        else
            message = 'User with mailid' + $scope.email3 + ' will be paying ' + ($scope.percent3 * $scope.price / 100);
        alertify.success(message);
    }

    $scope.payPaypal=function(){
window.location.replace('./dropin.html');
    }

    $scope.payBitcoin=function(){
        $http({
            url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            method: "GET"
        }).success(function(data, status, headers, config) {
            var bitValue=data.bpi.USD.rate
            var titleSwal='Are you sure about using paying '+$scope.amount/bitValue+ ' Bitcoins to '+$scope.mail;


            swal({   title: titleSwal,   text: "You will not be able to rollback once done!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, confirm it!",   cancelButtonText: "No, cancel It!",   closeOnConfirm: false,   closeOnCancel: false }, function(isConfirm){   if (isConfirm) {     swal("Payment Successful!", "You have payed "+$scope.amount/bitValue+ " Bitcoins to "+$scope.mail, "success"); 
                $http({
                    url: 'http://bitwise.mybluemix.net/sendEmail',
                    method: "GET",
                    params:{email:$scope.mail,message:'Your friend has payed you '+$scope.amount/bitValue+' Bitcoins',subject:'Splitwise Debt'}
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    alertify.success('Payment Mail Confirmation sent to recipient');
                    $http({
                        url: 'http://bitwise.mybluemix.net/sendBitcoin',
                        method: "GET",
                        params:{amount:0.0001}
                    }).success(function(data, status, headers, config) {
                        if(data.error==undefined)
                            alertify.success('Payment Successful using bit coin with tx_hash : '+data.tx_hash);
                        else{
                            alertify.error('Payment Unsuccessful due to insufficient funds');
                        }
                    });
                });
            } else {     swal("Cancelled", "Your Payment is Unsuccessful", "error");   } });

});
}






});