var latitude, longitude, map, identifier, trackMe, myLatLng, markers, i, mkrs, infoWindow, markerDescription;

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
      mkrs = gon.spots
      for (i = 0; i < mkrs.length; i++){
        myLatLng = { lat: mkrs[i].latitude, lng: mkrs[i].longitude };
        isOpen = mkrs[i].is_open
        markerDescription = mkrs[i].description
        if (isOpen===true){
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          });
          infoWindow = new google.maps.InfoWindow({
            content: markerDescription
          });
          markers.push([marker, infoWindow]);
      }
      else {
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
      }
    }
    markers.forEach(([marker, infoWindow] = args) => {
      //console.log('xxx', marker, infoWindow);
      google.maps.event.addListener(marker, 'click', function() {
        console.log('clicked', map, marker);
        infoWindow.open(map, marker);
        // messageWindow.open(map, marker);
      });
    })
    // for (i=0; i<gon.spots.length; i++){
    //   let markerDescription = gon.spots[i].description
    //
    // }

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

    if (trackMe === true){
      swal({
        title: 'Please add a description for your spot!',
        input:'text'
      }).then(function(result) {
        let description = result.value;
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


          // messageWindow = new google.maps.InfoWindow({
          //     content: document.getElementById('locationsaved')
          //   });

          // markers.push(marker);
          setTimeout(function(){
            // marker.setMap(null);
            document.getElementById('button-mark-spot').disabled = false;
          }, 6000);

          document.getElementById('button-mark-spot').disabled = true;
        });
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
