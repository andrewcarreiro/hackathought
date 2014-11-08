//mapParser.js

var MapParser = function(mapid, data) {
  this.googleMap = "";
  this.mapStyles = styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  this.callSome = function() {
    console.log(mapid);
  };
  this.initialize = function() {
  //   /*43.7000° N, 79.4000° W
  //   */
  //
    var mapOptions = {
      center: {
        lat: 43.653921,
        lng: -79.373217
      },
      // center: new google.maps.LatLng(43.653921, -79.373217)
      zoom: 15,
      // panControl: true,
      // zoomControl: true,
      // mapTypeControl: true,
      // scaleControl: true,
      // streetViewControl: true,
      // overviewMapControl: true
    };
    googleMap = new google.maps.Map(document.getElementById(mapid),
        mapOptions);
  };

  this.centerTo = function(clat,clng) {

    //googleMap.setCenter({lat: clat,lng:clng});

    if (navigator.geolocation) {
      var initialLocation;
      // navigator.geolocation.getCurrentPosition(function (position) {
      //    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //    googleMap.setCenter(initialLocation);
         var marker = new google.maps.Marker({
            map: googleMap,
            draggable: false,
            position: initialLocation
          });
         googleMap.setZoom(18);
      //});
   }
  };

  this.getCurrentPosition = function() {
    var initialLocation;
    navigator.geolocation.getCurrentPosition(function (position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    });
    return initialLocation;
  };

  this.checkJquery = function() {
    console.log($('#map'));
  };

  this.importJson = function() {
    console.log("calling import");
    var PATH = "../data/";
    // $.getJSON( PATH + "thoughtSpots.json", function( data ) {
    $.getJSON( PATH + "sample.json", function( data ) {
      console.log("Size: ", data.length);

        data.forEach( function(location) {

          var marker = new google.maps.Marker({
            map: googleMap,
            draggable: true,
            position: new google.maps.LatLng(location.LATITUDE, location.LONGITUDE)
          });
          google.maps.event.addListener(marker, 'dblclick', function() {
            googleMap.setZoom(14);
            googleMap.setCenter(marker.getPosition());
          });
          console.log(marker.getPosition());
        });

  //         // display station name when clicked
  //         google.maps.event.addListener(marker, 'click', function(){
  //           infoWindow.setContent(station["Station Name"]);
  //           infoWindow.open(map, this);
  //           //map.fitBounds(bounds);
  //         });

          // recenter map to the marker which was clicked


  //       });
    });
  };

};

// function initialize() {
//   /*43.7000° N, 79.4000° W
//   */
//   var mapOptions = {
//     center: { lat: 43.653921, lng: -79.373217},
//     // center: new google.maps.LatLng(43.653921, -79.373217)
//     zoom: 15
//   };
//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
// }
// google.maps.event.addDomListener(window, 'load', initialize);
