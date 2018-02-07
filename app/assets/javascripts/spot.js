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
            icon: 'https://d2poexpdc5y9vj.cloudfront.net/themes/3.0/img/icon-car.png'
          });
          infoWindow = new google.maps.InfoWindow({
            content: markerDescription
          });
          markers.push([marker, infoWindow]);
        }
        else {
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: 'http://youtubelive.soraweb.net/image/close.png'
          });
        }
      }
      markers.forEach(([marker, infoWindow] = args) => {
        google.maps.event.addListener(marker, 'click', function() {
          console.log('clicked', map, marker);
          infoWindow.open(map, marker);
        });
      })


    });
  }
}



function stopTracking(){
  window.navigator.geolocation.clearWatch(identifier);
}

window.onload = function (){
  $(document).on('turbolinks:load', function() {
    if ([document.getElementById('button-dont-track'),
    document.getElementById('button-mark-spot'),
    document.getElementById('button-track-me')].every(item => item))
    {

      document.getElementById('button-dont-track').disabled = true;
      document.getElementById('button-mark-spot').disabled = true;
      document.getElementById('button-track-me').addEventListener('click', function() {
        trackMe = true;
        initMap();
        window.navigator.geolocation.getCurrentPosition(function(position){
          console.log(position);
        })
        document.getElementById('map').innerHTML = '<h3>Loading...</h3>'
        document.getElementById('button-dont-track').disabled = false;
        document.getElementById('button-mark-spot').disabled = false;
        document.getElementById('button-track-me').disabled = true;

      });

      document.getElementById('button-dont-track').addEventListener('click',
      function() {
        stopTracking();
        document.getElementById('button-track-me').disabled = false;
        document.getElementById('button-dont-track').disabled = true;
        document.getElementById('button-mark-spot').disabled = true;
        console.log(identifier)
        document.getElementById('map').innerHTML = '<h3>Click Track Me to Start Spotting</h3>';
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
                icon: 'https://d2poexpdc5y9vj.cloudfront.net/themes/3.0/img/icon-car.png'
              });

              setTimeout(function(){
                document.getElementById('button-mark-spot').disabled = false;
                document.getElementById('button-dont-track').style.width = "50%"
              }, 6000);

              document.getElementById('button-mark-spot').disabled = true;
              document.getElementById('button-dont-track').style.width = "100%";
            });
          });
        }
      });

    }
    else {
      return
    }

  });
}
