function nameSize() {
  var mass = Math.max(26, 70-0.1*$(this).scrollTop()) + 'px';
  $('#expandable').css({'font-size': mass, 'line-height': mass});
}

function menuPosition() {
  var menuPositionX = Math.min(0, 0.47*$(this).scrollTop() - 210) + 'px';
  $('#side-menu').css({'left': menuPositionX});
}

function addNameClass() {
  if (window.scrollY >= $('#about').offset().top) {
    $('#expandable').addClass('white');
  } else {
    $('#expandable').removeClass('white');
  }
}

$(function() {
  nameSize();
  menuPosition();
  addNameClass();

  $(window).scroll(function() {
    nameSize();
    menuPosition();
    addNameClass();
  });

  $('.smooth-scroll').click(function() {
    var link = $(this).data('link');
    var target = $('#' + link);
    
    if (target) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  });
  
});