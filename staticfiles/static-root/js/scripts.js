// validate form
$("#formContact").validate({
    rules: {
        name: {
            required: true
        },
        subject: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            number: true
        },
        message: {
            required: true,
            minlength: 20,
            maxlength: 300
        },
        gRecaptchaResponseContact: {
            required: function () {
                if (grecaptcha.getResponse() == '') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    messages: {
        name: "Silakan masukkan nama Anda",
        subject: "Silakan masukkan subjek Anda",
        email: "Silakan masukkan email Anda yang valid",
        phone: "Silakan masukkan nomor telepon Anda yang valid",
        message: "Silakan masukkan pesan Anda antara 20 dan 300 karakter",
        gRecaptchaResponseContact: {
            required: "Recaptcha is required",
        }
    }
});

function onSubmitContact(data) {
    if ($("#hiddenRecaptchaContact").val() == '') {
        $("#hiddenRecaptchaContact").val(data);
    }


}

function onTestChange() {
    var key = window.event.keyCode || window.event.charCode;

    if (key === 13) {
        if ($(".textarea-pop").attr('rows') < 3) {
            $(".textarea-pop").attr('rows', parseInt($(".textarea-pop").attr('rows')) + 1);
            return false;
        }
        return true;
    } else if (key == 8 || key == 46) {
        var enteredText = $(".textarea-pop").val();
        var numberOfLineBreaks = (enteredText.match(/\n/g) || []).length + 1;
        // console.log(numberOfLineBreaks);
        if (numberOfLineBreaks < 4) {
            // if (numberOfLineBreaks <= 3) {
            $(".textarea-pop").attr('rows', numberOfLineBreaks);
            // }
            return false;
        }
    } else {
        return true;
    }
}
$(document).keyup(function (a) {
    if (27 == a.keyCode) {
        $("body").removeClass("offcanvas-menu-open");
        $(".bg-dark").hide();
        $(".bg-dark").animate({
            opacity: 0
        });
        $('body').removeClass('no-scroll');
        $('#contact-pop').fadeOut(1000);
        $('#mail-pop').fadeOut(1000);
    }
});
$(".close-menu").click(function (a) {
    a.preventDefault();
    $("body").removeClass("offcanvas-menu-open");
    $(".bg-dark").hide();
    $(".bg-dark").animate({
        opacity: 0
    });
    $('body').removeClass('no-scroll');
    $('#contact-pop').fadeOut(1000);
    $('#mail-pop').fadeOut(1000);
});

//$('.box-pop.active-booking').addClass('active');
$('.box-pop.active-contact').addClass('active');

$("#slider-range").slider({
    range: true,
    min: 0,
    max: 100000000,
    step: 500000,
    values: [10000000, 20000000],
    slide: function (event, ui) {
        $("#amount-1").val("Rp. " + numberThousand(ui.values[0]));
        $("#amount-2").val("Rp. " + numberThousand(ui.values[1]))
    }
});

function numberThousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#amount-1").val("Rp. " + numberThousand($("#slider-range").slider("values", 0)));
$("#amount-2").val("Rp. " + numberThousand($("#slider-range").slider("values", 1)));

$('ul.l-pop li a').on('click', function () {

    var li_tab = $(this);
    var parents = li_tab.parents('.popup');

    if (!li_tab.parent().hasClass('active')) {
        li_tab.parents('ul').find('li').each(function () {
            $(this).removeClass('active');
        });
        li_tab.parent().addClass('active');

        parents.find('.box-pop').each(function () {
            $(this).removeClass('active');
        });
        if (li_tab.attr('data-contact') == '1') {
            parents.find('.active-booking').addClass('active');
        } else if (li_tab.attr('data-contact') == '2') {
            parents.find('.active-contact').addClass('active');
        } else if (li_tab.attr('data-contact') == '3') {
            parents.find('.active-find').addClass('active');
            /* here we go */
        }
    }
});

$(document).ready(function () {
    [].slice.call(document.querySelectorAll('input.input-pop')).forEach(function (inputEl) {
        if (inputEl.value.trim() !== '') {
            $(inputEl).parent("p").addClass('filled-text');
        }
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    if (1 == 0) /* If success */ {
        $('#thank-pop').fadeIn();
    } else if (1 == 0) /* Validation Contact and If error */ {
        $('#contact-pop').fadeIn(1000);
        $('body').addClass('no-scroll');
        $("body").removeClass("offcanvas-menu-open");
        if ($("input[name='name']").val() == "") {
            $("input[name='name']").css('border-color', 'red');
        }

        if ($("input[name='email']").val() == "") {
            $("input[name='email']").css('border-color', 'red');
        }

        if ($("textarea[name='message']").val() == "") {
            $("textarea[name='message']").css('border-color', 'red');
        }
    }

    $(".custom-label input").on("change", function () {
        if ($(this).val() != "") {
            $(this).removeAttr("style");
        }
    });

    $(".custom-label textarea").on("change", function () {
        if ($(this).val() != "") {
            $(this).removeAttr("style");
        }
    });
    /* Validation Contact */


    $('.xclose-xdanger').bind('click', function () {
        $('.xdanger').slideUp(300);
    })

});

function onInputFocus(ev) {
    $(ev.target.parentNode).addClass('filled-text');
}

function onInputBlur(ev) {
    if (ev.target.value.trim() === '') {
        $(ev.target.parentNode).removeClass('filled-text');
    }
}

$('.click-menu').click(function () {
    $(this).parents('li').find('.box-child-menu').fadeIn('slow');
});

$('.back-menu').click(function () {
    $(this).parents('li').find('.box-child-menu').fadeOut('slow');
});



// ===============================================================================


function load_options(id, index, selected) {

    var ajax_path = "attractions/process_data.html";

    $.ajax({
        url: ajax_path,
        data: {
            index: index,
            id: id,
            selected: selected
        },
        type: 'POST',
        success: function (data) {

            $("#ATTR_" + index).html(data).selectpicker('refresh');

            // if(data=="")
            // {
            // 	$(".attraction-" + index).fadeOut();

            // 	if(index=="REGION")
            // 	{
            // 		load_options(id, 'CITY');
            // 	}
            // }
            // else
            // {
            // 	$(".attraction-" + index).fadeIn();
            // }

            $("#ATTR_" + index).trigger('change');

        }
    })
    return true;
}

$(document).ready(function () {
    $('.lazy').slick({
        lazyLoad: 'progressive',
        slidesToScroll: 1,
        infinite: true,
        // centerMode: true,
        // centerPadding: 100,
        // variableWidth: true,
    });

    $('.widget-asia').trigger('click');

    load_options('', 'COUNTRY', '15');


    // hide arrow & btn close on change
    $('.lazy').on('beforeChange', function (event, slick, direction) {
        $('.lazy .slick-arrow, .lazy .slick-arrow, #home-pop .box-close').css('opacity', '0');
    });

    // set arrow left, right, and btn close
    $('.lazy').on('afterChange', function (event, slick, direction) {
        var imgContainerLeft = $(".lazy .slick-current .image").offset().left,
            imgLeft = $(".lazy .slick-current .image img").offset().left,
            distance = imgLeft - imgContainerLeft - 50,
            closeRight = distance;;

        if ($(window).width() <= 769) {
            closeRight += 50;
        }

        $('.lazy .slick-prev').css({
            'left': distance,
            'opacity': '1'
        });
        $('.lazy .slick-next, #home-pop .box-close').css({
            'right': distance,
            'opacity': '1'
        });
        $('#home-pop .box-close').css({
            'right': closeRight,
            'opacity': '1'
        });

        if ($(window).width() <= 769) {
            var imgCurrent = $(".lazy .slick-current .image img").height(),
                wHeight = $(window).height(),
                closeTop = ((wHeight - imgCurrent) / 2) - 70;
            $('#home-pop .box-close').css('top', closeTop);
        }
    });

    // show popup if content has been loaded
    var interval = setInterval(function () {
        if (document.readyState === 'complete') {
            clearInterval(interval);
            // fix bug slider not centered
            $('#home-pop .slick-next').trigger('click');
            setTimeout(function () {
                $('#home-pop .slick-prev').trigger('click');

                $('#home-pop').fadeIn("slow", function () {

                    // set arrow left, right, and btn close
                    var intervalDistance = setInterval(function () {
                        var imgContainerLeft = $(
                                ".lazy .slick-current .image").offset()
                            .left,
                            imgLeft = $(
                                ".lazy .slick-current .image img")
                            .offset().left,
                            distance = imgLeft - imgContainerLeft - 50,
                            closeRight = distance;

                        if ($(window).width() <= 769) {
                            closeRight += 50;
                        }

                        $('.lazy .slick-prev').css({
                            'left': distance,
                            'opacity': '1'
                        });
                        $('.lazy .slick-next, #home-pop .box-close')
                            .css({
                                'right': distance,
                                'opacity': '1'
                            });
                        $('#home-pop .box-close').css({
                            'right': closeRight,
                            'opacity': '1'
                        });
                        clearInterval(intervalDistance);

                        if ($(window).width() <= 769) {
                            var imgCurrent = $(
                                    ".lazy .slick-current .image img")
                                .height(),
                                wHeight = $(window).height(),
                                closeTop = ((wHeight - imgCurrent) /
                                    2) - 70;
                            $('#home-pop .box-close').css('top',
                                closeTop);
                        }
                    }, 100);
                });

                // clearInterval(intervalBack);
            }, 1000);
        }
    }, 100);
});

$('#ATTR_COUNTRY').on('change', function () {
    $('#ATTR_REGION').html('').selectpicker('refresh');
    $('#ATTR_CITY').html('').selectpicker('refresh');
    load_options($(this).val(), 'REGION', '');

    var country_temp = $("option:selected", this).text().toLowerCase().replace(/[^\w ]/g, '').replace(
        / +/g, '_');
    a = country_temp;

    if (country_temp == "country") {
        $("#attr-search-form").attr('action', 'attractions.html');
    } else {
        $("#attr-search-form").attr('action', 'https://www.avia.travel/attractions/' + country_temp);
    }
});

$('#ATTR_REGION').on('change', function () {
    load_options($(this).val(), 'CITY', '');

    var region_temp = $("option:selected", this).text().toLowerCase().replace(/[^\w ]/g, '').replace(
        / +/g, '_');
    b = region_temp;

    if (region_temp == "region") {
        $("#attr-search-form").attr('action', 'https://www.avia.travel/attractions/' + a);
    } else {
        $("#attr-search-form").attr('action', 'https://www.avia.travel/attractions/' + region_temp);
    }
});

$('#ATTR_CITY').on('change', function () {
    var city_temp = $("option:selected", this).text().toLowerCase().replace(/[^\w ]/g, '').replace(
        / +/g, '_');

    if (city_temp == "city") {
        $("#attr-search-form").attr('action', 'https://www.avia.travel/attractions/' + b);
    } else {
        $("#attr-search-form").attr('action', 'https://www.avia.travel/attractions/' + city_temp);
    }
});

$(document).on('click', function (e) {
    var container = $('#home-pop .box-pop .slick-active img'),
        arrow = $('#home-pop .box-pop .slick-arrow');
    if ((!container.is(e.target) && container.has(e.target).length === 0 && !arrow.is(e.target)) || !$(e
            .target).parents('#home-pop .box-pop .slick-active img')) {
        $('#home-pop').fadeOut("slow");
        $('body').removeClass('no-scroll');
    }
});


// =========================================================================================================

/* counter banner data */

function banner_counter() {
    $('.banner_counter').bind('click', function (e) {
        $.post(base_url + 'banner_counter/counter', JSON.parse($(this).attr('count-data')));
    })
}
banner_counter()


$('.slider-banner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    fade: true,
    dots: true,
    speed: 1000,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    asNavFor: '.nav-banner'
});
var slide_to_show = 4;

$('.nav-banner').slick({
    slidesToShow: slide_to_show,
    slidesToScroll: 1,
    asNavFor: '.slider-banner',
    dots: false,
    arrows: false,
    centerMode: false,
    infinite: true,
    focusOnSelect: true,
    variableWidth: true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: slide_to_show
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: slide_to_show
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: slide_to_show
            }
        }
    ]
});

$('.slider-promo').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    arrows: false,
    infinite: true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});
$('.slide .fa-chevron-right').on('click', function () {
    $('.slider-promo').slick('slickNext');
});

$('.slide .fa-chevron-left').on('click', function () {
    $('.slider-promo').slick('slickPrev');
});

$('.nav-exp').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.xtclose').bind('click', function () {
    $('#myModal').modal('hide');
})

function check_sticky() {
    if ($(window).width() >= 768) {
        $("[data-sticky_column]").stick_in_parent({
            parent: "[data-sticky_parent]"
        });
    } else {
        $("[data-sticky_column]").trigger("sticky_kit:detach");
    }
}

var first_content_show;
var fixedRight = ($(window).width() - $('.full-tour').width()) / 2;
$(document).ready(function () {
    first_content_show = $('[sticky-id=1]').html();
    check_sticky();
    $(window).on('resize', function () {
        check_sticky();
    });

    $('.abs-arrow.right-arrow').css('right', '15px');
});

$('.arrow-exp .slider-right').on('click', function () {
    $('.nav-exp').slick('slickNext');
});

$('.arrow-exp .slider-left').on('click', function () {
    $('.nav-exp').slick('slickPrev');
});

$('.nav-exp').on('afterChange', function (event, slick, currentSlide) {
    var slide = $(slick.$slides[currentSlide]);
    var data_id = slide.attr('data-id');

    $('.content-show.active').fadeOut();
    if (data_id == 1) {
        $('.content-show.active').html(first_content_show);
    } else {
        $('.content-show.active').html($('[sticky-id=' + data_id + ']').html());
    }
    $('.content-show.active').fadeIn();
    $(document.body).trigger("sticky_kit:recalc");
    check_sticky();

    $("[data-sticky_column]").stick_in_parent().on("sticky_kit:bottom", function (e) {
        $('.abs-arrow').removeClass('fixed');
        $('.abs-arrow').addClass('bottom-abs');
        $('.abs-arrow.right-arrow').css('right', '20px');
    }).on("sticky_kit:unbottom", function (e) {
        $('.abs-arrow').addClass('fixed');
        $('.abs-arrow').removeClass('bottom-abs');
        $('.abs-arrow.right-arrow').css('right', fixedRight);
    }).on("sticky_kit:stick", function (e) {
        $('.abs-arrow').addClass('fixed');
        $('.abs-arrow.right-arrow').css('right', fixedRight);
    }).on("sticky_kit:unstick", function (e) {
        $('.abs-arrow').removeClass('fixed');
        $('.abs-arrow.right-arrow').css('right', '20px');
    });
});

$("[data-sticky_column]").stick_in_parent().on("sticky_kit:bottom", function (e) {
    $('.abs-arrow').removeClass('fixed');
    $('.abs-arrow').addClass('bottom-abs');
    $('.abs-arrow.right-arrow').css('right', '15px');
}).on("sticky_kit:unbottom", function (e) {
    $('.abs-arrow').addClass('fixed');
    $('.abs-arrow').removeClass('bottom-abs');
    $('.abs-arrow.right-arrow').css('right', fixedRight);
}).on("sticky_kit:stick", function (e) {
    $('.abs-arrow').addClass('fixed');
    $('.abs-arrow.right-arrow').css('right', fixedRight);
}).on("sticky_kit:unstick", function (e) {
    $('.abs-arrow').removeClass('fixed');
    $('.abs-arrow.right-arrow').css('right', '15px');
});

var heightcontent = $(".h-content").height();
$('.abs-arrow').height(heightcontent);

$('.love-exp').each(function () {
    $(this).click(function (event) {
        event.preventDefault();
        if (!$(this).parents('.for-exp').find('.love-exp').hasClass('active')) {
            $(this).find('.fa-heart-o').addClass('fa-heart').removeClass('fa-heart-o');
            $(this).parents('.for-exp').find('.love-exp').addClass('active');
        } else {
            $(this).parents('.for-exp').find('.love-exp').removeClass('active');
            $(this).find('.fa-heart').addClass('fa-heart-o').removeClass('fa-heart');
        }
    });
});

// $('.slider-home1').slick({
// 	dots: false,
// 	speed: 1000,
// 	autoplay: false,
// 	autoplaySpeed: 3000,
// 	arrows: false,
// 	adaptiveHeight: true,
// 	asNavFor: '.slider-home2, .slider-home3',
// });

$('.slider-home2').slick({
    dots: false,
    speed: 1000,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    asNavFor: '.slider-home3',
});
$('.slider-home3').slick({
    dots: false,
    arrows: false,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 3000,
    asNavFor: '.slider-home2',
});

$('.arrow-blog .slider-right').on('click', function () {
    $('.slider-home2').slick('slickNext');
});

$('.arrow-blog .slider-left').on('click', function () {
    $('.slider-home2').slick('slickPrev');
});

/* Flight */
$('ul.l-flight li a.click-return').on('click', function () {
    $('#end-date-flight, .space-date').show();
    $(this).addClass('active');
    $('ul.l-flight li a.click-oneway').removeClass('active');
});
$('ul.l-flight li a.click-oneway').on('click', function () {
    $('#end-date-flight, .space-date').hide();
    $(this).addClass('active');
    $('ul.l-flight li a.click-return').removeClass('active');
});

var go_to = ["Jakarta(JKT)", "Bangkok (BKKA)", "Bali(DPS)", "Surabaya(SUB)", "Kalimantan(PNK)", "Bangka(SUB)"];
$(".go-to").select2({
    data: go_to
});

var go_back = ["Jakarta(JKT)", "Bangkok (BKKA)", "Bali(DPS)", "Surabaya(SUB)", "Kalimantan(PNK)",
    "Bangka(SUB)"
];

$(".go-back").select2({
    data: go_back
});

$("#start-date-flight").datepicker({
    dateFormat: "dd.mm.yy",
    numberOfMonths: 2,
    minDate: 0,
    onSelect: function () {
        var dt2 = $('#end-date-flight');
        var startDate = $(this).datepicker('getDate');
        startDate.setDate(startDate.getDate() + 30);
        var minDate = $(this).datepicker('getDate');
        dt2.datepicker('setDate', minDate);
        //dt2.datepicker('option', 'maxDate', startDate);
        dt2.datepicker('option', 'minDate', minDate);
        $(this).datepicker('option', 'minDate', minDate);
    }
});

$('#end-date-flight').datepicker({
    dateFormat: "dd.mm.yy",
    numberOfMonths: 2,
});

var today = new Date();
$("#start-date-flight").datepicker("setDate", today);
$("#end-date-flight").datepicker("setDate", '+1d');

$('.form-control.input-flight').on('click', function () {
    $('.dropdown-flight').toggleClass('open');
});

var airline = ["Without preference", "Oneworld", "Skyteam", "Star Alliance", "Adria Airways", "Aegean Airline",
    "Aer Lingus", "Aeroflot"
];
$("#airline").select2({
    data: airline
});

$("html").click(function (a) {
    if (!$(a.target).is(".input-flight.form-control") && !$(a.target).parents().is(
            ".dropdown-flight")) {
        $('.dropdown-flight').removeClass('open');
    }
});

$('.abs-exchange').on('click', function () {
    var temp_source = $(this).parents().find('.f_elem_source');
    var temp_destination = $(this).parents().find('.f_elem_destination');

    var text_source = temp_destination.val();
    var text_destination = temp_source.val();

    temp_source.val(text_source);
    temp_destination.val(text_destination);

    var cont_source = temp_source.parent().find('.input_hidden');
    var cont_destination = temp_destination.parent().find('.input_hidden');

    var value_source = cont_destination.val();
    var value_destination = cont_source.val();

    cont_source.val(value_source);
    cont_destination.val(value_destination);
});

/* End Flight */


/* Tour */
$("#slider-price-tour").slider({
    range: true,
    min: 0,
    max: 120000000,
    step: 500000,
    values: [10000000, 120000000],
    slide: function (event, ui) {
        $("#amount-tour-1").val("Rp. " + numberThousand(ui.values[0]));
        $("#amount-tour-2").val("Rp. " + numberThousand(ui.values[1]))
    }
});

function numberThousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#amount-tour-1").val("Rp. " + numberThousand($("#slider-price-tour").slider("values", 0)));
$("#amount-tour-2").val("Rp. " + numberThousand($("#slider-price-tour").slider("values", 1)));

$('.box-range').click(function () {
    $('.in-range').toggleClass('open');
});

$('ul.list-tour li a').on('click', function () {
    var li_tour = $(this);
    var parents = li_tour.parents('.box-search-home');
    if (!li_tour.parent().hasClass('active')) {
        li_tour.parents('ul').find('li').each(function () {
            $(this).removeClass('active');
        });
        li_tour.parent().addClass('active');
    }
});
var place = ["Jakarta", "Bangkok", "Bali", "Surabaya", "Kalimantan", "Bangka"];
$(".place").select2({
    data: place
});
/* End Tour */

/* Attraction */
$(".click-domestic").click(function (event) {
    event.preventDefault();
    $(this).addClass('active');
    $('ul.l-flight li a.click-international').removeClass('active');

    var select = $('#ATTR_COUNTRY');
    select.val(15);
    select.attr('disabled', true);
    select.selectpicker('refresh');
    select.trigger('change');
});

$(".click-international").click(function (event) {
    event.preventDefault();
    $(this).addClass('active');
    $('ul.l-flight li a.click-domestic').removeClass('active');

    var select = $('#ATTR_COUNTRY');
    select.val('');
    select.attr('disabled', false);
    select.selectpicker('refresh');
    select.trigger('change');
});

$(document).on('click', '.i-plane', function () {
    var icon = $(this);
    setTimeout(function () {
        icon.parent().find('.select-attraction .dropdown-toggle').trigger('click');
    }, 100)
});
/* End Attraction */

/* Insurance */
$('ul.l-flight li a.click-daily').on('click', function () {
    $(this).addClass('active');
    $('ul.l-flight li a.click-annual').removeClass('active');
    daily_annual('Daily');
});
$('ul.l-flight li a.click-annual').on('click', function () {
    $(this).addClass('active');
    $('ul.l-flight li a.click-daily').removeClass('active');
    daily_annual('Annual');
});

$("#start-date-insurance").datepicker({
    // dateFormat: "D d/m",
    // numberOfMonths: 2,
    // minDate: 0,
    defaultDate: '0d',
    minDate: '0d',
    changeMonth: true,
    changeYear: true,
    yearRange: '-10:+100',
    dateFormat: "d M yy",
    minDate: 0,
    onSelect: function () {
        dailyanual = $('#daily_annual').val();
        date = $(this).datepicker('getDate');

        get_date = date.getDate();
        get_month = date.getMonth();
        get_year = date.getFullYear();


        if (dailyanual == 'Annual') {
            d = $(this).datepicker('getDate');
            d.setFullYear(d.getFullYear() + 1);

            $('#end-date-insurance').datepicker('setDate', d);
            $('#end-date-insurance').datepicker('option', 'minDate', d);
            $('#end-date-insurance').datepicker('option', 'maxDate', d);
        } else {
            if (date) {
                date.setDate(date.getDate() + 1);

                return_date = $(this).datepicker('getDate');
                return_date.setFullYear(return_date.getFullYear() + 1);
                return_date.setDate(return_date.getDate() - 1);

                $('#end-date-insurance').datepicker('option', 'minDate', date);
                $('#end-date-insurance').datepicker('setDate', date);
                $('#end-date-insurance').datepicker('option', 'maxDate', return_date);

                get_date = date.getDate();
                get_month = date.getMonth();
                get_year = date.getFullYear();
                // $('#iReturn').html('Return Date: ' + get_date + ' ' + m_names[get_month] + ' ' + get_year);
            }
        }


    }
});

$('#end-date-insurance').datepicker({
    // dateFormat: "D d/m",
    // numberOfMonths: 2,
    defaultDate: "+1d",
    changeMonth: true,
    changeYear: true,
    dateFormat: 'd M yy',
    minDate: "0d",
    yearRange: "-10:+100",
});

var today = new Date();
// $("#start-date-insurance").datepicker( "setDate", today );
// $("#end-date-insurance").datepicker( "setDate", '+1d' );

$('.box-select').click(function () {
    $('.in-select').toggleClass('open');
});

$("html").click(function (a) {
    if (!$(a.target).is(".box-select") && !$(a.target).parents().is(".box-select") && !$(a.target)
        .parents().is(".select-attraction")) {
        $('.in-select').removeClass('open');
    }
});

$('.plus').on('click', function (event) {

    var val = $(this).parents('li').find('input[type=text]').val();
    var parent = $(this).parents('li');
    if (val != 6) {
        val++;
        $('.plus').parents('li.' + parent.attr('class')).find('input[type=text]').val(val);

        $('.num-adult').html($(this).parents('li.adult').find('input[type=text]').val());
        $('.num-child').html($(this).parents('li.child').find('input[type=text]').val());
        $('.num-infant').html($(this).parents('li.infant').find('input[type=text]').val());

        $('.plus').parents('li.' + parent.attr('class')).find('.btn-minus').addClass('open');
    }

    if (val == 6) {
        $('.plus').parents('li.' + parent.attr('class')).find('.btn-plus').addClass('open');
    } else {
        $('.plus').parents('li.' + parent.attr('class')).find('.btn-plus').removeClass('open');
    }

});
$('.minus').on('click', function (event) {

    var val = $(this).parents('li').find('input[type=text]').val();
    var parent = $(this).parents('li');

    if (val != 1) {
        val--;
        $('.minus').parents('li.' + parent.attr('class')).find('input[type=text]').val(val);

        $('.num-adult').html($(this).parents('li.adult').find('input[type=text]').val());
        $('.num-child').html($(this).parents('li.child').find('input[type=text]').val());
        $('.num-infant').html($(this).parents('li.infant').find('input[type=text]').val());

        $('.plus').parents('li.' + parent.attr('class')).find('.btn-plus').removeClass('open');
    }

    if (val == 1) {
        $('.plus').parents('li.' + parent.attr('class')).find('.btn-minus').removeClass('open');
    } else {
        $('.plus').parents('li.' + parent.attr('class')).find('.btn-minus').addClass('open');
    }
});

$('ul.l-icon li a').on('click', function () {
    var li_tab = $(this);
    var parents = li_tab.parents('.box-search-home');
    if (!li_tab.parent().hasClass('active')) {
        li_tab.parents('ul').find('li').each(function () {
            $(this).removeClass('active');
        });
        li_tab.parent().addClass('active');

        parents.find('.abs-search-home').each(function () {
            $(this).removeClass('open');
        });

        $('.item-banner').removeClass('open');

        if (li_tab.attr('data-id') == '1') {
            parents.find('.active-flight').addClass('open');
            $('.item-banner').toggleClass('open');
            $('.in-range').removeClass('open');
            if ($(window).width() < 480) {
                $('ul.l-icon li a').attr('href', 'flight_international.html');
            }
            $(window).on('resize', function () {
                if ($(window).width() < 480) {
                    $('ul.l-icon li a').attr('href', 'flight_international.html');
                } else {
                    $('ul.l-icon li a').removeAttr('href');
                }
            });
        } else if (li_tab.attr('data-id') == '2') {
            parents.find('.active-tour').addClass('open');
            $('.item-banner').toggleClass('open');
            $('.in-range').removeClass('open');
            if ($(window).width() < 480) {
                $('ul.l-icon li a').attr('href', 'tour.html');
            }
            $(window).on('resize', function () {
                if ($(window).width() < 480) {
                    $('ul.l-icon li a').attr('href', 'tour.html');
                } else {
                    $('ul.l-icon li a').removeAttr('href');
                }
            });
        } else if (li_tab.attr('data-id') == '4') {
            parents.find('.active-attraction').addClass('open');
            $('.item-banner').toggleClass('open');
            $('.in-range').removeClass('open');
            if ($(window).width() < 480) {
                $('ul.l-icon li a').attr('href', 'attractions.html');
            }
            $(window).on('resize', function () {
                if ($(window).width() < 480) {
                    $('ul.l-icon li a').attr('href', 'attractions.html');
                } else {
                    $('ul.l-icon li a').removeAttr('href');
                }
            });
        } else if (li_tab.attr('data-id') == '5') {
            parents.find('.active-insurance').addClass('open');
            $('.item-banner').toggleClass('open');
            $('.in-range').removeClass('open');
            if ($(window).width() < 480) {
                $('ul.l-icon li a').attr('href', 'insurance.html');
            }
            $(window).on('resize', function () {
                if ($(window).width() < 480) {
                    $('ul.l-icon li a').attr('href', 'insurance.html');
                } else {
                    $('ul.l-icon li a').removeAttr('href');
                }
            });
        }
    } else {
        li_tab.parent().removeClass('active');
        parents.find('.abs-search-home').removeClass('open');
        $('.item-banner').removeClass('open');
    }
});

// $('.list-tour li a').on('click', function () {
//     var radio = $(this).parent().find('input');
//     radio.prop('checked', true);
//     var id_region = radio.val();
//     // console.log(id_region);
//     $.ajax({
//         url: 'https://www.avia.travel/search/get_country',
//         data: {
//             id: id_region
//         },
//         type: 'POST',
//         success: function (data) {

//             $("#select_country").html($(data)).selectpicker('refresh');
//         }
//     });
// });

$("html").click(function (a) {
    if (!$(a.target).is(".abs-search-home") && !$(a.target).parents().is(".abs-search-home") && !$(a
            .target).parents().is(".ui-menu-item") && !$(a.target).parents().is(".abs-icon") && !$(a
            .target).is("#ui-datepicker-div") && !$(a.target).parents().is("#ui-datepicker-div") && !$(a
            .target).parents().is(".ui-datepicker-header") && !$(a.target).parents().is(
            ".ui-state-default") && !$(a.target).is(".ui-state-default")) {
        $('.abs-search-home').removeClass('open');
        $('.item-banner').removeClass('open');
        $('ul.l-icon li').removeClass('active');
        $('.in-range').removeClass('open');
    }
});

$('.arrow-blog .slider-right').on('click', function () {
    $('.slider-home2').slick('slickNext');
});

$('.arrow-blog .slider-left').on('click', function () {
    $('.slider-home2').slick('slickPrev');
});

//Insurance JS///

benefit_annual_domestic = '<option value="1">Gold</option>' +
    '<option value="2">Silver</option>';

benefit_annual_international = '<option value="1">Gold</option>' +
    '<option value="2">Silver</option>' +
    '<option value="3">Asia Deluxe</option>';

benefit_shcengen = '<option value="1">Gold</option>';

benefit_all = '<option value="1">Gold</option>' +
    '<option value="2">Silver</option>';

worldwide_option = '<option value="1">Worldwide</option>';
asia_option = '<option value="2">Asia Deluxe</option>';
domestic_option = '<option value="3">Domestic</option>';
annual_option = '<option value="1">Worldwide</option>' +
    '<option value="3">Domestic</option>';

//Array for destination.
asia_region = [1, 13, 20, 28, 36, 39, 41, 49, 50, 52, 69, 109, 113, 122, 132, 133, 136, 145, 149, 150, 165, 170,
    174, 187, 192, 195, 203, 219, 227, 228, 236, 239, 260, 278, 282, 283, 279
];
schengen_region = [15, 24, 64, 65, 75, 81, 82, 91, 95, 107, 111, 112, 119, 137, 142, 143, 144, 152, 164, 175,
    185, 197, 198, 211, 220, 221, 226, 233, 234
];
special_region = [122, 132, 133, 203, 228]; //a non worldwide region that set into worldwide.


function in_array(needle, haystack, argStrict) {
    var key = '',
        strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    }

    return false;
}

function generate_benefit(tipe) {
    period = tipe;
    cover_type = $('#insurance_cover_type').val();
    destination = parseInt($("#insurance_destination").val());
    select_option = '<option value="" disabled selected>Choice of Benefit</option>';

    if (period == 'Annual') {
        if (cover_type == 3) {
            select_option += benefit_annual_domestic;
        } else {
            select_option += benefit_annual_international;
        }

        $('#insurance_benefit').html(select_option);
    } else {
        if (in_array(destination, schengen_region)) {
            select_option += benefit_shcengen;
            $('#insurance_benefit').html(select_option);
        } else {
            select_option += benefit_all;
            $('#insurance_benefit').html(select_option);
        }
    }

    $('#insurance_benefit').selectpicker('refresh');
}

function generate_cover_type(tipe) {
    period = tipe;
    destination = parseInt($('#insurance_destination').val());
    select_option = '<option value="" disabled selected>Cover Type</option>';

    if (period == 'Annual') {
        select_option += annual_option;
        $('#insurance_cover_type').html(select_option);

    } else {
        if (destination == 114) {
            select_option += domestic_option;
            $('#insurance_cover_type').html(select_option);
        } else if (in_array(destination, special_region)) {
            select_option += worldwide_option;
            $('#insurance_cover_type').html(select_option);
        } else if (in_array(destination, asia_region)) {
            select_option += asia_option;
            $('#insurance_cover_type').html(select_option);
        } else if (!in_array(destination, asia_region) && destination != 114) {
            select_option += worldwide_option;
            $('#insurance_cover_type').html(select_option);
        }
    }

    $('#insurance_cover_type').trigger('change');
    $('#insurance_cover_type').selectpicker('refresh');
}

function daily_annual(tipe) {
    generate_cover_type(tipe);
    generate_benefit(tipe);

    if (tipe == 'Annual') {
        $('#insurance_destination').removeAttr('selected');
        $("#insurance_destination").val('');
        $('#insurance_destination').attr('disabled', true);

    } else {
        $('#insurance_destination').attr('disabled', false);
    }

    $('#daily_annual').val(tipe);
    $('#insurance_destination').trigger('change');
    $('#insurance_destination').selectpicker('refresh');

    $('#start-date-insurance').attr('disabled', false);
    $('#end-date-insurance').attr('disabled', false);
    $('#start-date-insurance').attr('readonly', true);
    $('#end-date-insurance').attr('readonly', true);
    $('#start-date-insurance').datepicker('setDate', '');
    $('#end-date-insurance').datepicker('setDate', '');
    $('#end-date-insurance').datepicker('option', 'minDate', '0d');
    $('#end-date-insurance').datepicker('option', 'maxDate', '');
}

$('#insurance_destination').change(function () {
    period = $('.active-insurance .l-flight li a.active').html();

    if (period != 'Annual') {
        generate_cover_type(period);
        generate_benefit(period);
    }
});

$('#insurance_cover_type').change(function () {
    value = $(this).val();
    period = $('.active-insurance .l-flight li a.active').html();
    generate_benefit(period);

    if (value == 2) {
        $('#insurance_benefit').slideUp();
        $('#insurance_benefit').attr('disabled', true);
        // console.log('qwe')
    } else {
        $('#insurance_benefit').slideDown();
        $('#insurance_benefit').attr('disabled', false);

        if (period == 'annual' && value == 1) {
            $('#insurance_destination').attr('disabled', true);
        } else {
            $('#insurance_destination').attr('disabled', false);
        }
    }

    if (value == '') {
        cover_text = $('#insurance_cover_type option:selected').text();
    } else {
        cover_text = '-';
    }

    $('#insurance_benefit').selectpicker('refresh');

    // $("#iCover").hide();
    // $("#iCover").html('Cover Type: '+ cover_text);
    // $("#iCover").fadeIn();
});


///flight JS///
// var touchable = "ontouchend" in document;
// var showOnFocusLoc = false;
// if (!window.parametr) window.parametr = {};


// function DestinationsList(dests, searchOtherOption, parentDestinationSuffix) {
//     var self = this;
//     var list = dests;

//     function addClassNameByIndex(item, index) {
//         item.className = (index & 1) ? 'odd' : 'even';
//         return item;
//     }

//     function addSearchOtherOption(list) {
//         list.push(addClassNameByIndex({
//             value: '',
//             label: searchOtherOption
//         }, list.length));
//     }

//     function prepareDestination(destArray, isParent, isChild, withCountry) {
//         var code = '';
//         var label = '';
//         var text = '';
//         for (var destIndex in destArray) {
//             var destCurrent = destArray[destIndex];
//             var currText = destCurrent.name + ' (' + destCurrent.code + ')';
//             code += (code ? '/' : '') + destCurrent.code;
//             text += (text ? ', ' : '') + currText;
//             if (!isChild) {
//                 label += (label ? ', ' : '') + currText;;
//                 if (isParent) {
//                     label += parentDestinationSuffix;
//                 }
//                 if (withCountry && destCurrent.country.name) {
//                     label += ', ' + destCurrent.country.name;
//                 }
//             }
//         }
//         if (isChild) {
//             label = '<span class="child">' + text + '</span>';
//         }
//         return {
//             value: code,
//             label: label,
//             text: text
//         };
//     }

//     function prepareChildDestination(destArray) {
//         return prepareDestination(destArray, false, true, false);
//     }

//     function prepareDestinationsList(withCountry, excludedKey) {

//         function fillCountryList(dests) {
//             if (!window.parametr.countryList) {
//                 window.parametr.countryList = new Array();
//             }
//             for (var i in dests) {
//                 for (var j in dests[i]) {
//                     window.parametr.countryList[dests[i][j].code] = dests[i][j].country.code;
//                 }
//             }
//         }

//         function pushToOut(dest) {
//             if (dest.value !== excludedKey) {
//                 out.push(dest);
//             }
//         }

//         fillCountryList(list);
//         var out = [];
//         if (searchOtherOption) addSearchOtherOption(out);
//         for (var key in list) {
//             var destArray = list[key];
//             var keyInt = parseInt(key, 10);
//             if (destArray[0].parentCode) {
//                 pushToOut(addClassNameByIndex(prepareChildDestination(destArray), out.length));
//             } else {
//                 var isParent = (keyInt < dests.length - 1) && (destArray[0].code === dests[keyInt + 1][0]
//                     .parentCode);
//                 pushToOut(addClassNameByIndex(prepareDestination(destArray, isParent, false, withCountry), out
//                     .length));
//             }
//         }
//         return out;
//     }

//     function isDestArrayEqKey(destArray, keyArray) {
//         if (destArray.length !== keyArray.length) return false;
//         for (var i in destArray) {
//             if (destArray[i].code !== keyArray[i]) return false;
//         }
//         return true;
//     }

//     function searchAutocompleteItem(key) {
//         if (key) {
//             var keyArray = key.split('index.html');
//             for (var i in list) {
//                 if (isDestArrayEqKey(list[i], keyArray)) {
//                     return prepareDestination(list[i], false, false, false);
//                 }
//             }
//         }
//         return {
//             value: '',
//             label: ''
//         };
//     }

//     function getFullList() {
//         return prepareDestinationsList(true, '');
//     }

//     function getListWithoutCountry() {
//         return prepareDestinationsList(false, '');
//     }

//     function getListWithoutCountryExcept(key) {
//         return prepareDestinationsList(false, key);
//     }

//     function isNotEmpty() {
//         return list.length > 0;
//     }

//     function init() {
//         self.searchAutocompleteItem = searchAutocompleteItem;
//         self.getFullList = getFullList;
//         self.getListWithoutCountry = getListWithoutCountry;
//         self.getListWithoutCountryExcept = getListWithoutCountryExcept;
//         self.isNotEmpty = isNotEmpty;
//     }

//     init();
//     return self;
// }

// function getFullList() {
//     return prepareDestinationsList(true, '');
// }

// function prepareDestinationsList(withCountry, excludedKey) {

//     function fillCountryList(dests) {
//         if (!window.parametr.countryList) {
//             window.parametr.countryList = new Array();
//         }
//         for (var i in dests) {
//             for (var j in dests[i]) {
//                 window.parametr.countryList[dests[i][j].code] = dests[i][j].country.code;
//             }
//         }
//     }

//     function pushToOut(dest) {
//         if (dest.value !== excludedKey) {
//             out.push(dest);
//         }
//     }

//     fillCountryList(list);
//     var out = [];
//     if (searchOtherOption) addSearchOtherOption(out);
//     for (var key in list) {
//         var destArray = list[key];
//         var keyInt = parseInt(key, 10);
//         if (destArray[0].parentCode) {
//             pushToOut(addClassNameByIndex(prepareChildDestination(destArray), out.length));
//         } else {
//             var isParent = (keyInt < dests.length - 1) && (destArray[0].code === dests[keyInt + 1][0]
//                 .parentCode);
//             pushToOut(addClassNameByIndex(prepareDestination(destArray, isParent, false, withCountry), out
//                 .length));
//         }
//     }
//     return out;
// }

// function forceAutocomplete() {
//     $(this).val('');
//     $(this).autocomplete("search", 'JKT');
// }


// $(".ff_elem").autocomplete({
//     source: function (request, response) {
//         jQuery.getJSON(
//             "https://avia.gol.idc.cz/json/get-destinations?language=en&type=airports&search=" +
//             request.term,
//             function (jsonResponse) {
//                 var destinationsList = new DestinationsList(jsonResponse, '', '- all airports');
//                 var data = destinationsList.getFullList();
//                 response(data);
//             }
//         );
//     },
//     minLength: 3,
//     select: function (event, ui) {
//         event.preventDefault();
//         showOnFocusLock = true;
//         var selectedObj = ui.item;
//         $(this).val(selectedObj.text);
//         $(this).parent().find('.input_hidden').val(selectedObj.value);
//         return false;
//     },
//     html: true,
//     autoFocus: true,
//     focus: function () {
//         return false;
//     },
//     response: function (event, ui) {
//         if (ui.content.length === 0) {
//             return false;
//         }
//     }
// }).focus(forceAutocomplete).click(forceAutocomplete);

// $(".ff_elem").autocomplete("option", "delay", 100);