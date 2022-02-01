$(document).ready(function() {
  // --- our code goes here ---

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

});