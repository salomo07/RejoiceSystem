$(document).ready(function(){
	
	$('#action_menu_btn').click(function(){
		$('.action_menu').toggle();
	});
	$('.contacts > li').click(function(){
		$('.contacts > li').removeClass('active');
		$(this).attr('class','active');
	})
});