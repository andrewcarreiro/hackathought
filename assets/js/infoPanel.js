var InfoPanel = function(id) {
    this.element = document.getElementById(id);
    var dis = this;
    $(dis.element).find('.closer').on('click', function() {
        dis.close();
    });
}

InfoPanel.prototype.load = function(data) {
    console.log(this.element);
    this.open();
}

InfoPanel.prototype.open = function() {
    console.log('opening infopanel');
    var dis = this;
    $(dis.element).addClass('primer');
    setTimeout(function(){
        $(dis.element).addClass('active');
    },300);
}

InfoPanel.prototype.close = function() {
    var dis = this;
    $(dis.element).removeClass('active');
    setTimeout(function(){
        $(dis.element).removeClass('primer');
    },300);
}
