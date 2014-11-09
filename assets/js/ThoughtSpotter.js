//common methods for querying the data
ThoughtSpotter = {
	get : function(arg) {
		if ( typeof(arg) == 'undefined' ) {
			return thoughtSpots;
		}else if ( typeof(arg) == 'number' ) {
			for (var i=0; i<thoughtSpots.length; i++) {
				if ( thoughtSpots[i]["#"] == arg ) {
					return thoughtSpots[i];
				}
			}
		}
	}
}
