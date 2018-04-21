var scrollTopPadding = 150;

function nameSize() {
	var fontMass = Math.max(26, 90-0.14*$(this).scrollTop()) + 'px';
	$('#expandable').css({'font-size': fontMass, 'line-height': fontMass});

	var borderMass = Math.max(3, 8-0.01*$(this).scrollTop()) + 'px';
	$('a.name-header').css({'border-width': borderMass});
}

function menuPosition() {
	var menuPositionX = Math.min(0, 0.47*$(this).scrollTop() - 210) + 'px';
	$('#side-menu').css({'left': menuPositionX});
}

function smoothScroll(event) {
	var target = $('#' + event.target.dataset.link);

	if (target) {
		event.preventDefault();
		var $target = $(target);		
		var topPadding = $target.attr('id') === 'scroll-over' ? 0 : scrollTopPadding;
		$('html, body').animate({
			scrollTop: target.offset().top - topPadding
		}, 700, function() {
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

function activateMenuItems() {
	var scrollers = $(".scroller-section");
	var scrollPosition = $(this).scrollTop();
	var targetPositions = [scrollPosition];

	scrollers.each(function(i, scroller) {
		targetPositions.push($(scroller).offset().top);
	})

	targetPositions.sort(function(a, b) {
		return a - b;
	});

	var positionIndex =  Math.max(0, targetPositions.findIndex(function (pos) {
		return scrollPosition === pos;
	}) - 1);

	scrollers.each(function(i, scroller) {
		if (positionIndex === i) {
			toggleItemActive($(scroller).attr('id'));
		}
	});
}

function toggleItemActive(targetId) {
	$('.left-nav').each(function(i, navItem) {
		var linkType = navItem.dataset.link.substring(0, navItem.dataset.link.indexOf('-'));
		if(linkType == targetId){
			$(navItem).addClass('active');
		} else {
			$(navItem).removeClass('active');
		}
	});
}

function opaqueNameHeader() {
	var self = $(this);
	if($(window).width() <= 767){
		$('#side-menu a').each(function(i, link) {
			if ($(link).hasClass('active')) {
				if (self.scrollTop() >= $('#intro').offset().top){
					var elementId = link.dataset.link.substring(0, link.dataset.link.indexOf('-'));
					$('.name-header').css('background', $('#' + elementId).css('background-color'));
				} else {
					$('.name-header').css('background', 'transparent');
				}
			}
		});
	}
}


$(function() {
	nameSize();
	menuPosition();
	activateMenuItems();
	opaqueNameHeader();

	$(window).scroll(function() {
		nameSize();
		menuPosition();
		activateMenuItems();
		opaqueNameHeader();
	});

	$('.smooth-scroll').click(function() {
		smoothScroll(event);
	});

	$('.scroll-button-container i').click(function(event){
		smoothScroll(event);
	});

	$('#year').text((new Date()).getFullYear());
});