
$(document).ready(function(){
	aWidth = document.querySelector('.slider_list').offsetWidth;
	$('.slider_list').width(aWidth*3);
	$('.slider_list_image').width(aWidth);
	window.addEventListener('resize',function(){
		aWidth = document.querySelector('.slider_list').offsetWidth;
		$('.slider_list').width(aWidth*3);
		$('.slider_list_image').width(aWidth);
	})
	setInterval(function(){
		$('.slider_list').animate({'marginLeft':-aWidth},function(){
			$('.slider_list_image:first').appendTo('.slider_list');
			$('.slider_list').css({marginLeft:'0'})
		})
	},3000)
});
