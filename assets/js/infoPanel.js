var InfoPanel = function(id) {
  this.element = document.getElementById(id);
}

InfoPanel.prototype.load = function(data) {
  console.log(this.element);
  this.open();
}

InfoPanel.prototype.open = function() {
  console.log('opening infopanel');
  $(this.element).addClass('active');
}

InfoPanel.prototype.close = function() {
  $(this.element).removeClass('active');
}
