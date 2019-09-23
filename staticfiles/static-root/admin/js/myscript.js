(function($) {
    'use strict'
    $(document).ready(function() {
        $('#id_fasilitas').multiSelect();
        $("input[name='harga_0']").css({"margin-right": "20px"})
        $(".field-fasilitas .help").remove()
    });
})(django.jQuery);