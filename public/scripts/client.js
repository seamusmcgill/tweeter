/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Hide the compose tweet section and tweet error message on load
  $(".new-tweet").toggle();
  $("div.tweet-error").hide();

  // Escape function to protect against XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Create the HTML element for a tweet - using escape function on text from user
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src=${tweet["user"].avatars}></i>
          <p>${tweet["user"].name}</p>
        </div>
        <p>${tweet["user"].handle}</p>
      </header>
      <p>${escape(tweet["content"].text)}</p>
      <hr>
      <footer>
        <p>${timeago.format(tweet["created_at"])}</p>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
    
    return $tweet;
  };

  // Render all the tweets in the data
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweets-container").append($tweet);
    }
  };

  // Function to show error messaging on tweet error
  const sendTweetError = function(message) {
    
    $("div.tweet-error").slideDown(200, function() {
      $("div.tweet-error > p").html(message);
      $(".new-tweet textarea").addClass("tweet-error");
    });

  };

  // Toggle the compose new tweet area when the nav icon is clicked
  $(".navbar-top-nav > i").on("click", function() {
    $(".new-tweet").slideToggle(400, function() {
      $(".new-tweet textarea").focus();
    });
  });

  // Listen for the submission of a new tweet and serialize the data
  $(".new-tweet > form").submit(function(event) {
    event.preventDefault();
    
    // Hide any tweet error messaging / visuals before submission
    $("div.tweet-error").slideUp(function() {
      $("div.tweet-error > p").html("");
      $(".new-tweet textarea").removeClass("tweet-error");
    });

    // Check whether a valid tweet was submitted before submitting
    let $tweetInput = $("#tweet-text").val();

    if (!$tweetInput) {
      // Fill in the correct error messaging and show the errors
      sendTweetError("Uh oh. You have to type something to send a tweet!");
      return;
    }
    if ($tweetInput.length > 140) {
      sendTweetError("Oops. Your tweet is over the character limit.");
      return;
    }

    // If valid, serialize the form content
    let $formData = $(this).serialize();

    // Send post request to tweets with the form content
    $.post("/tweets", $formData)
      // Get the submitted tweet from /tweets once post request is successful
      .then(function() {
        $.getJSON("/tweets")
          .then(function(data) {
            // Get the new tweet which is now the last tweet in /tweets
            let $newTweetObject = data[data.length - 1];
            // Create a new tweet element and prepend it to the tweet container
            let $newTweet = createTweetElement($newTweetObject);
            $(".tweets-container").prepend($newTweet);
          });
      });
     
    // Clear form of content and reset character counter
    $(this).children("textarea").val("");
    $(this).children("output").html("140");
  });

  // Load tweets from /tweets and pass them to the renderTweets function
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
});

