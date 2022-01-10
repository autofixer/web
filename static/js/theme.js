;(function($) {
    "use strict";

    // Preloader
    function preloader() {
        if( $('.preloader').length ){
            $(window).on('load', function() {
                $('.preloader').fadeOut();
                $('.preloader').delay(50).fadeOut('slow');  
            });
        };
    }
    preloader();

    // Shop Detail Page add quantity for Shop detail page
    function shop_quantity() {
        $(document).ready(function() {
			$('.ms-minus').click(function () {
				var $input = $(this).parent().find('input');
				var count = parseInt($input.val()) - 1;
				count = count < 1 ? 1 : count;
				$input.val(count);
				$input.change();
				return false;
			});
			$('.ms-plus').click(function () {
				var $input = $(this).parent().find('input');
				$input.val(parseInt($input.val()) + 1);
				$input.change();
				return false;
			});
		});
    }
    //shop_quantity();

    // Owl Carousel For Homepage Version 1
    function specialize_carousel() {
           $('#specialize').owlCarousel({
                loop:true,
                margin:30,
                dots: false,
                // nav:true,
                autoplay: 500,
                smartSpeed: 1000,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:3
                    }
                }
            });
        }
    specialize_carousel();

    // Testimonial Carousel For Homepage Version 1
    function testimonial_carousel() {
        $('#customers-testimonials').owlCarousel({
            loop: true,
            center: true,
            items: 3,
            margin: 0,
            nav: true,
            autoplay: true,
            dots: false,
            autoplayTimeout: 8500,
            smartSpeed: 450,
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 2
              },
              1170: {
                items: 3
              }
            }
        });
    }
    testimonial_carousel();

    // Faq Page Accordions For FAQ Page
    function faq_accordion() {
        $('.collapse').on('show.bs.collapse', function () {
            $(this).siblings('.card-header').addClass('active');
        });
        
        $('.collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.card-header').removeClass('active');
        });
    }
    faq_accordion();

    

    // Counters for About Page
    function counter() {
        var a = 0;
        $(window).scroll(function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
                },
                {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                    //alert('finished');
                }
                });
            });
            a = 1;
        }
        });
    }
    //counter();    

    // Owl Carousel For Homepage Version 2
    function shop_carousel() {
        $('#online-shop').owlCarousel({
             loop:true,
             margin:30,
             dots: false,
             nav:true,
             autoplay: 500,
             smartSpeed: 1000,
             responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        });
    }
    //shop_carousel()();

}) (jQuery);