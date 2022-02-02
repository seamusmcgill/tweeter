/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Hide the tweet error message on load
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

  $(".navbar-top-nav > i").on("click", function() {
    $(".new-tweet").slideToggle(400, function() {
      $(".new-tweet textarea").focus();
    });
  });

  // Listen for the submission of a new tweet and serialize the data
  $(".new-tweet > form").submit(function(event) {
    event.preventDefault();
    
    // Check whether a valid tweet was submitted before submitting
    let $tweetInput = $("#tweet-text").val();

    // Hide any tweet error messaging / visuals before submission
    $(".new-tweet textarea").removeClass("tweet-error");
    $("div.tweet-error").hide();

    if (!$tweetInput) {
      // Fill in the correct error messaging and show the errors
      $("div.tweet-error > p").html("Uh oh. You have to type something to send a tweet!");
      $("div.tweet-error").slideDown(200);
      $(".new-tweet textarea").addClass("tweet-error");
      
      return;
    }
    if ($tweetInput.length > 140) {
      // Fill in the correct error messaging and show the errors
      $("div.tweet-error > p").html("Oops. Your tweet is over the character limit.");
      $(".new-tweet textarea").addClass("tweet-error");
      $("div.tweet-error").slideDown(200);
      return;
    }

    let $formData = $(this).serialize();

    // Send post request to tweets with the form content
    $.post("/tweets", $formData)
      // Get the submitted tweet from /tweets once post request is successful
      .then(function() {
        $.getJSON("/tweets")
          .then(function(data) {
            let $newTweetObject = data[data.length - 1];
            // Create a new tweet element and prepend it to the tweet container
            let $newTweet = createTweetElement($newTweetObject);
            $(".tweets-container").prepend($newTweet);
          });
      });
     
    // Clear form of content
    $("#tweet-text").val("");
  });

  // Load tweets from /tweets and pass them to the renderTweets function
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
});

