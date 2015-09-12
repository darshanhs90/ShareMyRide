var Uber = require('node-uber');
 
var uber = new Uber({
		client_id: 'LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi',
		client_secret: 'szpcAy4sJkV6PCWJwSC5WZm8NrxseLkA7i-Y07YA',
		server_token: 'wZQgCwLn40j65ukJBi3EMqufTDKgYSJPmcIPOgh7',
		redirect_uri: 'http://localhost:1337/getAuth',
		name: 'ShareMyRide'
	});


/*uber.authorization({ refresh_token: 'REFRESH_TOKEN' }, 
  function (err, access_token, refresh_token) {
    if (err) console.error(err);
    else {
      console.log(access_token);
      console.log(refresh_token);
    }
  });
*/

uber.authorization({ authorization_code: 'SOME AUTH CODE' }, 
  function (err, accessToken, refreshToken) {
    uber.user.profile(accessToken, function (err, res) {
      console.log(err);
      console.log(res);
    });
  });