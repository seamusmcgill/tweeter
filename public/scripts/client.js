/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  // Create the HTML element for a tweet
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
      <p>${tweet["content"].text}</p>
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

  // Listen for the submission of a new tweet and serialize the data
  $(".new-tweet > form").submit(function(event) {
    event.preventDefault();
    
    // Check whether a valid tweet was submitted before submitting
    let $tweetInput = $("#tweet-text").val();

    if (!$tweetInput) {
      alert("Uh oh. You have to type something tos end a tweet!");
      return;
    }
    if ($tweetInput.length > 140) {
      alert("Oops. Your tweet is over the character limit.");
      return;
    }

    let $formData = $(this).serialize();

    // Send post request to /tweets with the data
    $.post("/tweets", $formData);
  });

  // Looad tweets from /tweets and pass them to the renderTweets function
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
});

