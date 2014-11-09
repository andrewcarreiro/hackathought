//common methods for querying the data
ThoughtSpotter = {
	get : function(arg) {
		if ( typeof(arg) == 'undefined' ) {
			return thoughtSpots;
		}else if ( typeof(arg) == 'number' ) {
			for (var i=0; i<thoughtSpots.length; i++) {
				if ( thoughtSpots[i]["#"] == arg ) {
						var classes = thoughtSpots[i]["CATEGORY"];
						classes = classes.replace("Health and Social Services","health");
						classes = classes.replace("Recreation and Culture","culture");
						classes = classes.replace("Spirituality and Wellbeing","spirituality");
						classes = classes.replace("Family and Friends","family");
						classes = classes.replace("Work and School","work");
						classes = classes.replace("Sex and Relationships","relationships");
						classes = classes.replace("Legal and Financial","legal");
						classes = classes.split(", ");
						thoughtSpots[i].classes = classes;
						classes.clean("");

						var tags = [];
						tags = tags.concat( thoughtSpots[i]["Other Requirements"]);
						tags = tags.concat( thoughtSpots[i]["Hours and Availability"]);
						tags = tags.concat( thoughtSpots[i]["Community Services"]);
						tags = tags.concat( thoughtSpots[i]["Fees and Accessibility"]);

						thoughtSpots[i].tags = tags;
						tags.clean("");

					return thoughtSpots[i];
				}
			}
		}
	}
}

Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};
