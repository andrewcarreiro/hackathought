//mapParser.js
// BAD: Never use Globals, except in hackathons!
var PATH = "../data/";

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

  this.thoughtSpots = [];

  this.initialize = function() {
  //   /*43.7000° N, 79.4000° W
  //   */


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

    centerMapToUser(googleMap);
  };

  this.markers = [];

  this.callSome = function() {
    console.log(mapid);
  };

  this.limitByTitle = function(title) {
    var mapRef = this;
    if(mapRef.markers.length > 0) {
      console.log("Title: ", title);
    }

    // if(thoughtSpots.length > 0) {
    //   var spot = thoughtSpots[1];
    //   console.log(spot);
    //   console.log(spot["City"]);
    // }
    //for()
    // for(var i = 0; i < thoughtSpots.length; i++) {
    //   var spot = thoughtSpots[i];
    //   console.log(spot);
    //   if(spot['City'].match(title) !== null) {
    //     mapRef.thoughtSpots.splice(i);
    //   }
    // }
    thoughtSpots.forEach(function(val, index, arr) {
      if(val['City'] == title)
        arr.splice(index);
    });
    console.log(thoughtSpots.length);


    // mapRef.markers.forEach(function(value, index, arr) {
    //   // if(mapRef.markers[index]['City'].match(title) !== null) {
    //   //   mapRef.markers.splice(index);
    //   // }
    // });

    //console.log("sddsa");
  };

  this.checkJquery = function() {
    console.log($('#map'));
  };

  this.importJson = function(obj) {
    console.log("calling import");
    var mapRef = this;
    // $.getJSON( PATH + "thoughtSpots.json", function( data ) {
    $.getJSON( PATH + "sample.json", function( data ) {
      //console.log("Size: ", data.length);
      //console.log(data[0]);
      data.forEach( function(location) {
        //console.log(location);

        var marker = new google.maps.Marker({
          map: googleMap,
          draggable: true,
          position: new google.maps.LatLng(location.LATITUDE, location.LONGITUDE)
        });

        marker.locMarkerId = location['#'];

        mapRef.markers.push(marker);
        //mapRef.thoughtSpots.push(location);

        google.maps.event.addListener(marker, 'dblclick', function() {
          googleMap.setZoom(14);
          googleMap.setCenter(marker.getPosition());
        });
          //console.log(marker.getPosition());
    });
        mapRef.sortDateSets();

    });
  };

  this.sortDateSets = function() {
    var mapRef = this;
    mapRef.markers.sort(function(a,b) {
      // if(a.locMarkerId > b.locMarkerId) {
      return a.locMarkerId - b.locMarkerId;
      // }
    });

  };
};

// Centers the map to user's current location when loaded initially
window.centerMapToUser = function(locObj) {
    //var mapRef = obj;
    //console.log("MAP_REF:",mapRef);
    navigator.geolocation.getCurrentPosition(function (position) {
      var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var marker = new google.maps.Marker({
          map: locObj,
          draggable: false,
          position: initialLocation
      });
      //mapRef.markers.push(marker);
      locObj.setCenter(initialLocation);
    });

};


function submitSearch() {
  var term = $('#searchBox').val();

  // Public Name
  // var publicName = "Public Name";
  // mp.limitByTitle(term);
  //mp.markers = [];
  console.log("Spots", term);
  mp.limitByTitle(term);

}

$(window).load(function() {
  //console.log("SDf",document.getElementById('searchBoxTerm'));
  $('#searchBox').keypress(function() {
    var term = $(this).val();
    if(term.length > 2) {
      console.log("Term: " + term);
      //mp.limitByTitle(term);
    }
    //mp.limitByTitle("dfds");
  });

  $.getJSON( PATH + "sample.json", function( data ) {
      console.log("Size: ", data.length);
      //console.log(data[0]);
      window.thoughtSpots = data;
  });
  thoughtSpots.sort(function(a,b) {
    return a['#'] - b['#'];
  });

});















