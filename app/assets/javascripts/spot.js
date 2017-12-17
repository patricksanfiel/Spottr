var latitude, longitude, map, identifier, trackMe, myLatLng, marker;
function initMap() {
  if (trackMe===true){
    identifier=window.navigator.geolocation.watchPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 15
      });
    });
  };
}

function stopTracking(){
  window.navigator.geolocation.clearWatch(identifier);
}

window.onload = function() {
    document.getElementById('button-stop-tracking').disabled = true;
    document.getElementById('button-mark-spot').disabled = true;
   document.getElementById('button-track-me').addEventListener('click', function() {
     trackMe = true;
     initMap();
       window.navigator.geolocation.getCurrentPosition(function(position){
         console.log(position);
       })
       document.getElementById('button-stop-tracking').disabled = false;
       document.getElementById('button-mark-spot').disabled = false;
   }
 );

  document.getElementById('button-stop-tracking').addEventListener('click',
  function() {
    stopTracking();
    console.log(identifier)
    // window.navigator.geolocation.getCurrentPosition(function(position){
    //   console.log(position);
    // })
  });

  trackMe=document.getElementById('button-mark-spot').addEventListener('click',
  function() {
    if (trackMe === true){
      myLatLng = {lat: latitude, lng: longitude};
      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
      setTimeout(function(){
        marker.setMap(null);
        document.getElementById('button-mark-spot').disabled = false;
      },300000)

      $.ajax({
        type: "POST",
        url: "/spots",
        dataType: 'JSON',
        data: {
          spot: {
            latitude: latitude,
            longitude: longitude
        }
      }
    })
      .done(function(data){
        if (data.is_successs) {
          console.log("SPOT CREATED");
        }
      })
      document.getElementById('button-mark-spot').disabled = true;
    }
  });
}
