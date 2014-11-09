//mapParser.js
// BAD: Never use Globals, except in hackathons!
var PATH = "../data/";
var MAX_ENTRIES = 0; // the number of thoughtSpots will be set later after JSON file is imported
var DEFAULT_ZOOM_LVL = 15; // default zoom level, we can adjust as needed

// Main Map object, most functionalities is self-contained and encapsulated, but
// occasionally needs globals to perform special functionality
var MapParser = function(mapid, data) {
  this.googleMap = undefined;
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

  // Initializes the map for the first time
  this.initialize = function() {
  //   /*43.7000° N, 79.4000° W
  //   */
    var mapRef = this;
    var styleArray = setStyles();
    var mapOptions = {
      center: {
        lat: 43.653921,
        lng: -79.373217
      },
      // center: new google.maps.LatLng(43.653921, -79.373217)
      zoom: DEFAULT_ZOOM_LVL,
      // panControl: true,
      // zoomControl: true,
      // mapTypeControl: true,
      // scaleControl: true,
      // streetViewControl: true,
      // overviewMapControl: true
      styles:styleArray
    };
    //googleMap.setOptions({styles: styleArray});
    //console.log(this);

    // sets Map reference to Global variable
    window.googleMap = new google.maps.Map(document.getElementById(mapid),
        mapOptions);

    // center the map to user's view, then will call import JSON file
    centerMapToUser(googleMap);

  };

  // Markers reference, we use this to remove or set the markers currently on
  // the map
  this.markers = [];

  // Filter entries by limiting entries too
  // alters Global thoughSpots array
  this.limitBy = function(title, catergory) {
    var mapRef = this;
    var firstEntrySet = false; // a boolean flag that is set to show first entry from
                          // the search results
    title.trim();
    var regEx = new RegExp('.*' + title + '.*');
    catergory  = catergory || 'City'; // Set default category just in case


    console.log("Markers",mapRef.markers.length);
    console.log("Cities Numbers: ", thoughtSpots.length);
    //mapRef.clearAll();
    if(!thoughtSpots.some(function(value) {
      title.trim();
      return value[catergory].match(title);
    }))
      return 0; // No Matching keyword, return early

    thoughtSpots = thoughtSpots.filter(function(val, index, arr) {
      val[catergory].trim();
      val['#'].trim();

      if(val[catergory].match(regEx) === null) {
        mapRef.markers[index].setMap(null);
      }
      else {
        if(!firstEntrySet) {
          googleMap.setCenter(mapRef.markers[index].getPosition());
          googleMap.setZoom(DEFAULT_ZOOM_LVL - 3);
          firstEntrySet = true;
        }
        return val;
      }
    });

  };

  // Search entries
  this.searchEntries = function(term, category) {
    var mapRef = this;
    term.trim();
    var regEx = new RegExp('.*' + term + '.*');

    if(!category) category = 'Public Name';

    console.log("term",term);

    thoughtSpots.some(function(val, index, arr) {

      if(val[category].match(regEx) !== null) {
        googleMap.setCenter(mapRef.markers[index].getPosition());
        googleMap.setZoom(DEFAULT_ZOOM_LVL);

        mapRef.toggleBounce(index);

        return true;
      }

    });

  };

  // Set bounce animation
  this.toggleBounce = function(index) {
    var mapRef = this;

    mapRef.markers[index].setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
        mapRef.markers[index].setAnimation(null);
    }, 2100);

  };

  // Restore all markers
  this.resetMapMarkers = function() {
    var mapRef = this;


    for (var i = 0; i < mapRef.markers.length; i++) {
      if(mapRef.markers[i])
        mapRef.markers[i].setMap(googleMap);
    }
  };

  // Clear all markers from Map only, not array
  this.clearAll = function() {
    var mapRef = this;
    for (var i = 0; i < mapRef.markers.length; i++) {
      if(mapRef.markers[i])
        mapRef.markers[i].setMap(null);
    }
  };

  // Import JSON asynchoronously and set markers on map
  // also sets click listeners
  this.importJson = function() {
    console.log("calling import");
    var mapRef = this;

    $.getJSON( PATH + "sample.json", function( data ) {
      //if(window.thoughtSpots === undefined)
      window.thoughtSpots = data;

      MAX_ENTRIES = data.length;

      data.forEach( function(location) {

        var marker = new google.maps.Marker({
          map: this.googleMap,
          draggable: true,
          position: new google.maps.LatLng(location.LATITUDE, location.LONGITUDE)
        });

        marker.locMarkerId = location['#'];

        mapRef.markers.push(marker);

        google.maps.event.addListener(marker, 'dblclick', function() {
          googleMap.setZoom(DEFAULT_ZOOM_LVL);
          googleMap.setCenter(marker.getPosition());
        });
      });
    });
  };

  // Can be used to sort arrays if querying gets too slow
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
// This function call importJson(), since we want to call this after map
// finished displaying
window.centerMapToUser = function(locObj) {
    //var mapRef = obj;
    navigator.geolocation.getCurrentPosition(function (position) {
      var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // var marker = new google.maps.Marker({
      //     map: mp.googleMap,
      //     draggable: false,
      //     position: initialLocation
      // });

      // mp.markers.push(marker);

      //console.log("CENTER:" + mp.markers);
      googleMap.setCenter(mp.markers[1].getPosition());
      //googleMap.setCenter(initialLocation);
    });

    mp.importJson();

};

function setStyles() {
    var styleArray = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}];
    // [
    //   {
    //     featureType: "all",
    //     stylers: [
    //       {hue: "#075AFF"},
    //       { saturation: -80 }

    //     ]
    //   },{
    //     featureType: "road.arterial",
    //     elementType: "geometry",
    //     stylers: [
    //       { hue: "#075AFF" },
    //       { saturation: 70 }
    //     ]
    //   },{
    //     featureType: "poi.business",
    //     elementType: "labels",
    //     stylers: [
    //       { visibility: "off" }
    //     ]
    //   }
    // ];
    return styleArray;
}

$(window).load(function() {
  // Might think of including dynamic autocomplete later if time permits
  // $('#searchBox').keypress(function() {
  //   var term = $(this).val();
  //   if(term.length > 2) {
  //     console.log("Term: " + term);
  //   }
  // });

  $('#searchBtn').click(function() {
    var term = $('#searchBox').val();
    mp.searchEntries(term);
  });

  $('#filterBtn').click(function() {
    var term = $('#searchBox').val();
    mp.limitBy(term, 'City');
  });

  $('#resetMapBtn').click(function() {
    mp.resetMapMarkers();
  });

});















