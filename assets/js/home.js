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
		$("#cat_items").toggleClass('active');
	});

	$("#cat_items").find('li').each(function(i,ele) {
		$(ele).on('click', function() {
			mp.limitBy($(ele).attr('data-cat'), 'CATEGORY');
			$("#cat_items").toggleClass('active');
		});
	});

	$("#searchBox").on('change', function() {
		console.log('search');
		mp.searchEntries($(this).val(), 'Public Name');
	});

	//$("#map").click(function() {
	//	$("#searchbox").blur();
	//	$("#fancy_search").removeClass('active');
	//});
});
