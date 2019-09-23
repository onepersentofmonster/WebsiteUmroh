$(document).ready(function(){
	$("img").hide().not(function() {
		return this.complete && $(this).fadeIn();
	}).bind("load", function(){ $(this).fadeIn(); });

	$(".menu-toggle").click(function(a) {
		a.preventDefault();
		$("body").toggleClass("offcanvas-menu-open");
		$(".bg-dark").show();
		$(".bg-dark").animate({
		opacity: .4
	});
	});
	$("html").click(function(a) {
		if (!$(a.target).is(".menu-toggle") && !$(a.target).parents().is(".menu-toggle") && !$(a.target).is("#offcanvas-menu") && !$(a.target).parents().is("#offcanvas-menu")) {
			$("body").removeClass("offcanvas-menu-open");
			$(".bg-dark").hide();
			$(".bg-dark").animate({
				opacity: 0
			});
		}
	});
	$(document).keyup(function(a) {
		if (27 == a.keyCode) {
			$("body").removeClass("offcanvas-menu-open");
			$(".bg-dark").hide();
			$(".bg-dark").animate({
				opacity: 0
			});
		}
	});
	$(".close-menu").click(function(a) {
		a.preventDefault();
		$("body").removeClass("offcanvas-menu-open");
		$(".bg-dark").hide();
		$(".bg-dark").animate({
			opacity: 0
		});
	});
	var config = {
		useDelay: 'onload',
		reset: false,
	}
	var configbottom = {
		scale      : 0.8,
		mobile     : true,
		origin   : "bottom",
		distance : "100px",
		duration : 1000,
		scale    : 1
	};
	var configtop = {
		scale      : 0.8,
		mobile     : true,
		origin   : "top",
		distance : "100px",
		duration : 1000,
		scale    : 1
	};
	var configright = {
		origin: 'right',
		duration: '1200',
		distance: '30px',
	};		
	var configrightmobile = {
		origin: 'right',
		mobile: false,
		duration: '1200',
		distance: '30px',
	};
	var configleft = {
		origin: 'left',
		duration: '1200',
		distance: '30px',
	};	
	window.srright = ScrollReveal(config);

	srright.reveal('.product-animated-right', configright);
	srright.reveal('.product-animated-left', configleft);
	srright.reveal('.product-animated-bottom', configbottom);
	srright.reveal('.product-animated-right-mobile', configrightmobile);
	srright.reveal('.product-animated-top', configtop);
	srright.reveal(".seq-1", configbottom, 300);


	$('a.contact').click(function() {
	    $('#contact-pop').show();
	    $('body').addClass('no-scroll');
	    $("body").removeClass("offcanvas-menu-open");
		$(".bg-dark").hide();
		$(".bg-dark").animate({
			opacity: 0
		});
	});
});