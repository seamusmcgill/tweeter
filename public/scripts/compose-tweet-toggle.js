/* eslint-disable no-undef */
$(document).ready(function() {
  // When scrolling past the height of the nav in mobile view, toggle visibility of nav and togglebutton
  $(window).scroll(function() {
    if ($(this).scrollTop() > 120 && $(window).width() <= 1024) {
      $("nav.navbar-top div.navbar-top-nav").hide();
      $(".container > div.toggle-button").fadeIn(200);
    } else {
      $("nav.navbar-top div.navbar-top-nav").show();
      $(".container > div.toggle-button").fadeOut(200);
    }
  });

  // Scroll up and slide down the new-tweet div on toggle button click
  $("main.container > div.toggle-button").on("click", function() {

    $("html, body").animate({scrollTop: 0 }, "slow");
    
    $(".new-tweet").slideDown(function() {
      $(".new-tweet textarea").focus();
    });
  });
});