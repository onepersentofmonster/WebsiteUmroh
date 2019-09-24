(function (q) {
    var mobileMenuOn = !0;

    function displayMobileMenu() {
        mobileMenuOn ? q(".mobile-menu-set").show() : q(".mobile-menu-set").hide()
    }

    function getMobileMenu() {
        window.innerWidth < 408 != mobileMenuOn && (mobileMenuOn = !mobileMenuOn, displayMobileMenu())
    }
    q(window).resize(function (e) {
        getMobileMenu()
    }), getMobileMenu(), displayMobileMenu();
    var actMobile = !1;

    function controlStateMenu() {
        actMobile ? (q("body").addClass("fixedmedia"), q(".mb-menu-block").show(), q(".mb-menu-bar")
            .animate({
                left: 0
            }, 200)) : (q(".mb-menu-block").hide(), q(".mb-menu-bar").animate({
            left: -235
        }, 200), q("body").removeClass("fixedmedia"))
    }
    q(".toggle-menu-mobile").bind("click", function () {
        actMobile = !0, controlStateMenu()
    }), q(".mb-menu-block").bind("click", function () {
        actMobile = !1, controlStateMenu()
    });
})(jQuery);