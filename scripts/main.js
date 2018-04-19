function nameSize() {
	var mass = Math.max(26, 90-0.14*$(this).scrollTop()) + 'px';
	$('#expandable').css({'font-size': mass, 'line-height': mass});
}

function menuPosition() {
	var menuPositionX = Math.min(0, 0.47*$(this).scrollTop() - 210) + 'px';
	$('#side-menu').css({'left': menuPositionX});
}

function smoothScroll(event) {
	var target = $('#' + event.target.dataset.link);
		var topPadding = 150;
		
		if (target) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - topPadding
			}, 700, function() {
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) {
					return false;
				} else {
					$target.attr('tabindex','-1');
					$target.focus();
				};
			});
		}
}

$(function() {
	nameSize();
	menuPosition();

	$(window).scroll(function() {
		nameSize();
		menuPosition();
	});

	$('.smooth-scroll').click(function() {
		smoothScroll(event);
	});

	$('.scroll-button-container i').click(function(event){
		smoothScroll(event);
	});
	
});