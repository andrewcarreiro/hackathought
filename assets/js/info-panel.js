var InfoPanel = function(id,template_id) {
	this.element = document.getElementById(id);
	this.template = document.getElementById(template_id).innerHTML;
	this.scroll = null;
	var dis = this;
	$(dis.element).find('.closer').on('click', function() {
		dis.close();
	});
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
	},3001);
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
	},300);
}


InfoPanel.prototype.fillPanel = function(id) {
	var reducedData = ThoughtSpotter.get(id);

	var html = _.template(this.template,{d:reducedData});

	$(this.element).html(html);
}
