const $navMenu = $('#main-navigation');
const $overlay = $('.fs-overlay');

var $body;
$body = $('body');

$(function () {


  // Countdown

  if ($('#countdown').length) {

    var countDownDate = new Date("Nov 13, 2021 18:30:00 GMT+0800").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("countdown").innerHTML = "<div>" + days + "<small><span lang='en'>Days</span><span lang='zh'>天</span></small> </div><div>" + hours + "<small><span lang='en'>Hours</span><span lang='zh'>小时</span></small> </div><div>" + minutes + "<small><span lang='en'>Minutes</span><span lang='zh'>分</span></small> </div><div>" + seconds + "<small><span lang='en'>Seconds</span><span lang='zh'>秒</span></small></div> ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
      }
    }, 1000);

  }

  // Main Navigation
  $('#menu-trigger').on('click', function () {
    $navMenu.addClass('is--active');
    $overlay.fadeIn();
  });

  $('#main-navigation .nav-close').on('click', function () {
    $navMenu.removeClass('is--active');
    $overlay.fadeOut();
  });

  $('.site-popup__close').on('click', function () {
    $('.site-popup').fadeOut();
    $overlay.fadeOut();
  });

  $overlay.on('click', function () {
    if ($navMenu.hasClass('is--active')) {
      $('#main-navigation .nav-close').trigger('click');
    }

    if ($('.site-popup').is(':visible')) {
      $('.site-popup__close').trigger('click');
    }
  });


  // Main Navigation
  // $('#mobileMenu').on('click', function () {
  //   $(this).toggleClass('is--active');
  //   $('.fs-overlay, #main-navigation').toggleClass('is--active');
  // });

  // $('.fs-overlay').on('click', function () {

  //   if ($('#mobileMenu').hasClass('is--active')) {
  //     $('#mobileMenu').trigger('click');
  //   }

  // });


  // Adding Social Icons and Language Selector to Mobile Menu
  if (window.matchMedia("(max-width: 1199px)").matches) {
    $('#main-navigation').append("<div class='d-flex justify-content-center mt-5'>"+$('.header__tools').html()+"</div>");
  }


  // Language Selector
  //localStorage.setItem("Current Language", "en");

  $body.on('click', '.language-selector span', function(){
    $('.language-selector').toggleClass('is--active').find('span').removeClass('is--active');
    $(this).addClass('is--active');
    localStorage.setItem("Current Language", $(this).attr('lang'));
    $('html').attr('lang', $(this).attr('lang'));
  });

  var currentlang = localStorage.getItem("Current Language");
  if(currentlang == null || currentlang == undefined) {
    currentlang = 'en';
  }
  $('html').attr('lang', currentlang);
  $('.language-selector span').removeClass('is--active');
  $('.language-selector span[lang='+currentlang+']').addClass('is--active');



  // Photobooth JS
  $('.photobooth__start').on('click', function () {
    $('.photobooth__step').removeClass('photobooth__step--active');
    $('.photobooth__step2').addClass('photobooth__step--active');
});

$('.photobooth__camera-icon').on('click', function () {
    
    $('.photobooth__user-img img').removeClass('d-none');
    $('.photobooth__upload-pic').addClass('d-none');
    $('.photobooth__select-frame').removeClass('d-none');
    photoBoothSlider(4,4);
});

$('.photobooth__select-frame .btn--back').on('click', function () {
    $('.photobooth__upload-pic').removeClass('d-none');
    $('.photobooth__select-frame').addClass('d-none');
});

$('.photobooth__select-frame .btn--next').on('click', function () {
    $('.photobooth__select-frame').addClass('d-none');
    $('.photobooth__select-stickers').removeClass('d-none');
    photoBoothSlider(3,4);

});

$('.photobooth__select-stickers .btn--back').on('click', function () {
  $('.photobooth__select-frame').removeClass('d-none');
  $('.photobooth__select-stickers').addClass('d-none');
});

$('.photobooth__select-stickers .btn--submit').on('click', function () {
  $('.photobooth__select-stickers').addClass('d-none');
  $('.photobooth__share').removeClass('d-none');
});

$('.photobooth__share .btn--repeat').on('click', function () {
  $('.photobooth__share').addClass('d-none');
  $('.photobooth__upload-pic').removeClass('d-none');
});



  // Calling Functions
  bodyScroll();
  ScrollTo();

});


// On Scroll
$(window).on('scroll', function () {
  bodyScroll();
});



// On Load
$(window).on('load', function () {
  $('.language-selector').removeClass('d-none');
});



function bodyScroll() {
  var scrollTop = $(window).scrollTop();

  if (scrollTop >= 50) {
    $('.site-header').addClass('is--sticky');

  } else {
    $('.site-header').removeClass('is--sticky');
  }

}


function photoBoothSlider(mobileSlides,DesktopSlides) {
  $('.photobooth__frames-wrapper').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    items: mobileSlides,
    center: true,
    navText: ['<i class="icon-block icon-block--arrow-left"></i>', '<i class="icon-block icon-block--arrow-right"></i>'],
    responsive: {
      0: {},
      767: {
        items: DesktopSlides,
        center: false,
        autoplay: false,
        loop: false,
      }
    }
});
}


function ScrollTo() {

  $body.on("click", '.scrollTo', function () {
    var $target, $scrollTop;
    $target = $(this).data('target');
    $scrollTop = 90;
    if (window.matchMedia('(max-width: 768px)').matches) {
      $scrollTop = 100;
    }

    if ($target == null || $target == undefined) {
      $target = 'html';
    }
    $('html,body').animate({
      scrollTop: $($target).offset().top - $scrollTop
    }, 300);
    return false;
  });
}
