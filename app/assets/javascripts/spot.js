var latitude, longitude, map, identifier, trackMe, myLatLng, markers, i, mkrs;

markers = []
function initMap() {
  var isOpen,
      marker;
  if (trackMe===true){
    identifier=window.navigator.geolocation.watchPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 15
      });
      mkrs = JSON.parse(document.querySelector("#all_spots").value);
      for (i = 0; i < mkrs.length; i++){
        myLatLng = { lat: mkrs[i][0], lng: mkrs[i][1] };
        isOpen = mkrs[i][2]
        if (isOpen===true){
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
      }
      else {
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
      }
    }
  });
}
}
// function setMapOnAll(map) {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }


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
         // setMapOnAll(map);
       })
       document.getElementById('button-stop-tracking').disabled = false;
       document.getElementById('button-mark-spot').disabled = false;

   });

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
    var infoWindow, messageWindow;
    if (trackMe === true){
      let description = prompt("Describe the spot")
      $.ajax({
        type: "POST",
        url: "/spots",
        dataType: 'JSON',
        data: {
          spot: {
            latitude: latitude,
            longitude: longitude,
            is_open: true,
            description: description
          }
        }
      }).done(function(savedSpot){
        console.log('spot saved successfully (probably)');
        console.log(savedSpot);

        spotLatLng = {lat: savedSpot.latitude, lng: savedSpot.longitude};
        marker = new google.maps.Marker({
          position: spotLatLng,
          map: map,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });

        infoWindow = new google.maps.InfoWindow({
            content: savedSpot.description
        });

        // messageWindow = new google.maps.InfoWindow({
        //     content: document.getElementById('locationsaved')
        //   });
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
          // messageWindow.open(map, marker);
        });

        // markers.push(marker);
        setTimeout(function(){
          // marker.setMap(null);
          document.getElementById('button-mark-spot').disabled = false;
        }, 6000)
        document.getElementById('button-mark-spot').disabled = true;
      });



  }
});
}
//
// function addMarker(lat, lng){
//   marker = new.google.maps.Marker({
//     position: myLatLng,
//     map: map
//   })
// }
