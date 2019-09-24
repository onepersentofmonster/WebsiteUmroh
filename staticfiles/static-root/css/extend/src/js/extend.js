/**
 * DEVELOPED BY RIFKI FAHRUROZI | rifki@gositus.com
 */

$(document).ready(function() {
  // LOGIN
  $("form#formlogin").on("submit", function(e) {
    e.preventDefault();
    var dataForm = $(this).serialize();

    // Cek dulu, apakah form CONTACT DETAIL di halaman booking aktif atau tidak.
    // Kalau aktif, maka proses login via ajax yang responnya nanti akan di fill ke form
    var cp_form_state =
      $("input.form-contact-state").data("formContact") || "undefined";
    // console.log(cp_form_state);

    // Proses AJAX Data
    $.ajax({
      url: base_url + "member_login",
      data: dataForm,
      method: "POST",
      dataType: "html",
      beforeSend: function() {
        $(".spinner-body").show();
        $(".spinner-body").html(
          '<div class="spinner-content"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div class="loader-text">Silahkan tunggu....</div></div>'
        );
      },
      complete: function(data) {
        $(".spinner-body").hide();
        var respData = JSON.parse(data.responseText);

        if (!respData.error) {
          // Apabila tidak ada error

          // Apabila user saat ini sedang berada di halaman booking dan sedang mengisi form contact person
          if (cp_form_state !== "active") {
            window.location = respData.url_redirect;
          } else {
            $(".err-container").remove(); //hapus pesan error apabila ada
            $(".spinner-body").hide();

            // Munculkan navigasi member di header
            $.ajax({
              url: base_url + "asd",
              dataType: "html"
            }).done(function(elementprofile) {
              $(".profile-menu-temp").css("display", "inline-block");
              $(".profile-menu-temp").html(elementprofile);

              // Profile BUTTON
              $("button.profile-btn").on("click", function() {
                var profile_menu_position = $(".profile-menu").css("top");
                if (profile_menu_position === "500px") {
                  $(".profile-menu").css("display", "inline-block");
                  $(".profile-menu").css("top", "60px");
                } else {
                  $(".profile-menu").css("display", "none");
                  $(".profile-menu").css("top", "500px");
                }
              });
            });

            var salutation = $("select#contact_title")[0];
            for (i = 0; i <= salutation.length; i++) {
              // console.log(salutation[i].value);
              var thisopt = $(salutation[i]); // gunakan $ supaya jadi object di jQuery
              // console.log(thisopt);
              if (thisopt.val() == respData.customer_data.salutation) {
                $("select#contact_title").selectpicker("val", thisopt.val()); // panggil method dari plugin bootstrap-select supaya value select berubah dan UI direfresh
              }
            }

            $("input#contact_first_name").val(
              respData.customer_data.customer_firstname
            );
            $("input#contact_first_name").attr("readonly", "readonly");
            $("input#contact_last_name").val(
              respData.customer_data.customer_lastname
            );
            $("input#contact_last_name").attr("readonly", "readonly");

            $("input#contact_email").val(respData.customer_data.email);
            $("input#contact_email").attr("readonly", "readonly");

            $("input#contact_phone").val(respData.customer_data.home_phone);
            $("input#contact_phone").attr("readonly", "readonly");

            $("textarea#contact_address").val(
              respData.customer_data.home_address
            );
            $("textarea#contact_address").attr("readonly", "readonly");

            // CONTACT COUNTRY
            var contact_country = $("select#contact_country")[0];
            // console.log(contact_country);
            if (contact_country != undefined) {
              for (i = 0; i <= contact_country.length; i++) {
                // console.log(salutation[i].value);
                var thisopt = $(contact_country[i]); // gunakan $ supaya jadi object di jQuery
                // console.log(thisopt);
                if (thisopt.val() == respData.customer_data.tour_country_id) {
                  $("select#contact_country").selectpicker(
                    "val",
                    thisopt.val()
                  ); // panggil method dari plugin bootstrap-select supaya value select berubah dan UI direfresh
                }
              }
            }

            // FILL PASSPORT | hidden field
            $("input#existing_passport").attr({
              "data-passport-number": respData.passport.passport_number,
              "data-passport-expiry": respData.passport.passport_expiry_date,
              "data-tour-country-id": respData.passport.tour_country_id
            });

            // DATE OF BIRTH

            //Datepicker harus diinisialisasi di awal sebelum diberikan parameter method setDate agar terdeteksi
            $("input#contact_dob").datepicker({
              changeMonth: false,
              changeYear: false,
              // yearRange: "-84:-12",
              // defaultDate: "-12y",
              dateFormat: "d M yy"
            });

            var dob = respData.customer_data.birth_date;
            // console.log(dob);
            $("input#contact_dob").datepicker("setDate", new Date(dob));

            // Hide checkbox opsi register member
            $(".register-member-checkbox-container").hide();
            $("p.login-via-form").hide();

            // Hilanglam login button di header | harusnya ini bisa diganti jadi button profile
            $("a.login").hide();

            // Hide POPUP LOGIN
            $("#login-pop").hide();
            $("body").removeClass("no-scroll");

            return true; // !important kembalikan nilai true supaya tidak stuck di false karena konflik dengan validasi form.
          }
        } else {
          $(".spinner-body").hide();
          $(".err-container").html("<p>" + respData.err_message + "</p>");
        }
      }
    });
  });

  //Proses LOGOUT
  $("a.logout").on("click", function() {
    $.ajax({
      url: base_url + "member_logout",
      beforeSend: function() {
        console.log("LOADING LOGOUT...");
      },
      complete: function(data) {
        console.log(data);
        var respDataLogout = JSON.parse(data.responseText);
        window.location = respDataLogout.url_redirect;
      }
    });
  });

  // Proses REGISTER
  $("form#formregister").on("submit", function(e) {
    e.preventDefault();
    console.log("Proses register via AJAX");
  });

  // Profile BUTTON
  $("button.profile-btn").on("click", function() {
    var profile_menu_position = $(".profile-menu").css("top");
    if (profile_menu_position === "500px") {
      $(".profile-menu").css("display", "inline-block");
      $(".profile-menu").css("top", "60px");
    } else {
      $(".profile-menu").css("display", "none");
      $(".profile-menu").css("top", "500px");
    }
  });

  // Validasi form di account_activation
  $("form.aa-form").on("submit", function(event) {
    var member_new_password = $('input[name="member_new_password"]').val();
    var member_confirm_new_password = $(
      'input[name="member_confirm_new_password"]'
    ).val();

    if (member_new_password !== member_confirm_new_password) {
      $(".aap-err-message").empty();
      $(".aap-err-message").html("<span>*Password tidak sama</span>");
      return false;
    } else {
      return true;
    }
  });

  // REQUEST TOKEN BARU
  $("button.request_new_token").on("click", function() {
    $.ajax({
      url: "request_new_token_activation",
      dataType: "JSON",
      method: "POST",
      data: $('input[name="request_token_email"]').serialize(),
      beforeSend: function() {
        $(".account-activation-message").html("<h3>Loading.....</h3>");
      },
      complete: function(data) {
        $(".account-activation-message").html(
          "<h3>Link aktivasi akun telah dikirimkan ke email anda.</h3>"
        );
      }
    });
  });

  /********************* CLICK OUTSIDE OBJECT ELEMENT ***********************/
  const profile_menu = $(".profile-menu");
  $(document).on("mouseup", function(e) {
    if (!profile_menu.is(e.target) && profile_menu.css("display") === "block") {
      // console.log(profile_menu);
      profile_menu.css("display", "none");
      profile_menu.css("top", "500px");
    }
  });

  // Link untuk login
  $("a.login").click(function() {
    $("#login-pop").show();
    $("body").addClass("no-scroll");
    $("body").removeClass("offcanvas-menu-open");
    $(".bg-dark").hide();
    $(".bg-dark").animate({
      opacity: 0
    });
  });

  $("a.new-account-btn").click(function() {
    $("#login-pop").hide();
    $("#register-pop").show();
  });

  $("a.login-link").click(function() {
    $("#register-pop").hide();
    $("#login-pop").show();
  });

  // popup close button
  $("button.close-popup-btn").on("click", function() {
    $("#login-pop").hide();
    $("body").removeClass("no-scroll"); // hapus no scroll
    $("body").addClass("offcanvas-menu-open");
  });
});
