//home page js
$(document).ready(function() {
	//locate button
	$('.icon-search').on('click', function() {
		if (! $(this).parent().is('.active') ){
			$(this).parent().addClass('active');
			$(this).siblings('input').focus();
		}else{
			$(this).parent().removeClass('active');
		}
	});


	// Category button
	$(".category_expansion").click(function(){
		alert('ya ');
		$("#cat_items").toggleClass('active');
	});
});
