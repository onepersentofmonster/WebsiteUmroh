
    $('.tour-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        fade: true,
        dots: true,
        speed: 1000,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    });

    $('.slider-travel').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        focusOnSelect: false,
        infinite: true,
        slidesToScroll: 1,
    });

    $('.slider-testi').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        centerPadding: '0',
        centerMode: true,
        dot: false,
        arrows: true,
        focusOnSelect: true,
        infinite: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $('.slider-testi').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if (currentSlide != nextSlide) {
            $('.show-less').parents('.bdy-testi').find('p').animate({
                maxHeight: '125px'
            });
            $('.show-less').hide();
            $('.see-more').show();
        }
    });

    function windowScroll() {
        if ($(window).width() > 767) {
            $(document).on("scroll", onScroll);
            $('a[href^="#"]').on('click', function (e) {
                e.preventDefault();
                $(document).off("scroll");

                $('a').each(function () {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');

                var target = this.hash,
                    menu = target;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - 119
                }, 500, 'swing', function () {
                    $(document).on("scroll", onScroll);
                });
            });



        }
        if ($(window).width() < 767) {
            $(document).on("scroll", onScroll);
            $('a[href^="#"]').on('click', function (e) {
                e.preventDefault();
                $(document).off("scroll");

                $('a').each(function () {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');

                var target = this.hash,
                    menu = target;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - 70
                }, 500, 'swing', function () {
                    $(document).on("scroll", onScroll);
                });
            });
        }
    }

    $(function () {
        windowScroll();
    });

    $("[data-fancybox]").fancybox({
        infobar: false,
        buttons: [
            'close'
        ],
        loop: true,
    });

    $(document).ready(function () {

        if (window.location.hash) {
            var hash = window.location.hash;
            console.log(hash)
            $('html, body').animate({
                scrollTop: $(hash.toString()).offset().top - $(".hdr-tour").outerHeight()
            }, 1000);
        }
    });