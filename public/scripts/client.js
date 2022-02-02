/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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
  $(".new-tweet > form").submit(function(event) {
    event.preventDefault();
    let $formData = $(this).serialize();
    
    $.post("/tweets", $formData);
  });

});

