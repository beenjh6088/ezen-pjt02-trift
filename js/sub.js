$(document).ready(function(){
	//tabmenu
	$('.tabmenu_tabBar>a').click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active')
	});

	//post
	$('tft-card').click(function(){
		$('#popup').addClass('active')
		$('.post').click(function(){
			$('#popup').removeClass('active')
			})
		});
});
