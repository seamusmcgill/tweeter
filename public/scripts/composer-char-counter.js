/* eslint-disable no-undef */
// Logic to dynamically update the new tweet character counter
$(document).ready(function() {

  // Listen for input in the tweet text area
  $("#tweet-text").on("input", function() {

    // Auto grow the text area if tweet is over one line
    if (this.scrollHeight > 48) {
      this.style.height = (this.scrollHeight) + 'px';
    }

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
});