/* eslint-disable no-undef */
$(document).ready(function() {
  // --- our code goes here ---
  // Hide the scroll button on pageload
  $(".container > div.toggle-button").hide();

  // Listen for input in the tweet text area
  $("#tweet-text").on("input", function() {

    // Set the initial characters to 140 and dynamically update the HTML counter
    let characters = 140 - $(this).val().length;

    $(this).siblings("output").html(characters);
    
    // Add class to change text color to red if negative characters left
    if (characters < 0) {
      $(this).siblings("output").addClass("over-limit");
    } else {
      $(this).siblings("output").removeClass("over-limit");
    }
  });

  // When scrolling past the height of the nav, toggle visibility of nav button and togglebutton
  $(window).scroll(function() {
    if ($(this).scrollTop() > 120) {
      $("nav.navbar-top div.navbar-top-nav").hide();
      $(".container > div.toggle-button").fadeIn(200);
    } else {
      $("nav.navbar-top div.navbar-top-nav").show();
      $(".container > div.toggle-button").fadeOut(200);
    }
  });

  // Scroll up and slide down the new-tweet div on toggle button click
  $("main.container > div.toggle-button").on("click", function() {
    $(".new-tweet").slideDown(function() {
      $("html, body").animate({scrollTop: 0 }, "slow", function() {
        $(".new-tweet textarea").focus();
      });
    });
  });

});