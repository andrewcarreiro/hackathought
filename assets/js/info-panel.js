var InfoPanel = function(id,template_id) {
	this.element = document.getElementById(id);
	this.template = document.getElementById(template_id).innerHTML;
	this.scroll = null;
	var dis = this;
}

InfoPanel.prototype.load = function(id) {
	this.fillPanel(id);
	this.open();
}

InfoPanel.prototype.open = function() {
	console.log('opening infopanel');
	var dis = this;
	$(dis.element).addClass('primer');
	setTimeout(function(){
		$(dis.element).addClass('active');
	},300);
	setTimeout(function() {
		if( dis.scroll ) {
			dis.scroll.destroy();
			dis.scroll = null;
		}
		dis.scroll = new IScroll(
			$(dis.element).find('.content>div').get(0),
			{
				click : true
			}
		);
	},301);
	$(dis.element).find('.closer, .closem').on('click', function() {
		dis.close();
	});
}

InfoPanel.prototype.close = function() {
	var dis = this;
	if( dis.scroll ) {
		dis.scroll.destroy();
		dis.scroll = null;
	}
	$(dis.element).removeClass('active');
	setTimeout(function(){
		$(dis.element).removeClass('primer');
		$(dis.element).children().remove();
	},300);
}


InfoPanel.prototype.fillPanel = function(id) {
	var reducedData = ThoughtSpotter.get(Number(id));
	var html = _.template(this.template,{d:reducedData});

	$(this.element).html(html);
}
