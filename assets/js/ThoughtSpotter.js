//common methods for querying the data
ThoughtSpotter = {
	get : function(arg) {
		if ( typeof(arg) == 'undefined' ) {
			return DATA_ARR;
		}else if ( typeof(arg) == 'number' ) {
			for (var i=0; i<DATA_ARR.length; i++) {
				if ( DATA_ARR[i]["#"] == arg ) {
						var classes = DATA_ARR[i]["CATEGORY"];
						classes = classes.replace("Health and Social Services","health");
						classes = classes.replace("Recreation and Culture","culture");
						classes = classes.replace("Spirituality and Wellbeing","spirituality");
						classes = classes.replace("Family and Friends","family");
						classes = classes.replace("Work and School","work");
						classes = classes.replace("Sex and Relationships","relationships");
						classes = classes.replace("Legal and Financial","legal");
						classes = classes.split(", ");
						DATA_ARR[i].classes = classes;
						classes.clean("");

						var tags = [];
						tags = tags.concat( DATA_ARR[i]["Other Requirements"]);
						tags = tags.concat( DATA_ARR[i]["Hours and Availability"]);
						tags = tags.concat( DATA_ARR[i]["Community Services"]);
						tags = tags.concat( DATA_ARR[i]["Fees and Accessibility"]);

						DATA_ARR[i].tags = tags;
						tags.clean("");

					return DATA_ARR[i];
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
