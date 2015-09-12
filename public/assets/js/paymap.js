
var map,marker;
function initMap() {

  $.ajax({
    url: 'http://bitwise.mybluemix.net/getMapData',
    success: function(res){



      var myLatLng = {lat:res[0].geocode.lat,lng:res[0].geocode.lng};

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
      });
      for (var i = res.length - 1; i >= 0; i--) {
        console.log(res[i])
        marker = new google.maps.Marker({
          position: {lat:res[i].geocode.lat,lng:res[i].geocode.lng},
          map: map,
          title: res[i].name
        });
      };

    }
  });
}
