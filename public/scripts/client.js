/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  // sets error message to hide when page loads
  $('.error-msg').hide();

  // creates the html code, interpolating the values inputted
  const createTweetElement = function(data) {
    const time = timeago.format(data.created_at);
    const tweet = `<article class="tweet-container">
      <div class="tweet-header">
        <div class="tweet-header-left">
          <img class="resize" src="${data.user.avatars}">
          <p2>${data.user.name}</p2>
        </div>
        <p2 class="twitter-handle" >${data.user.handle}</p2>
      </div>
      <div class="tweet-content">
        <p>${escape(data.content.text)}</p>
      </div>
      <footer class="tweet-footer">
        <p>${time}</p>
        <div class="tweet-footer-right">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return tweet;
  };
  
  // dispays all the tweet on load
  const renderTweets = function(data) {
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('.tweety-container').prepend($tweet);
    }
  };

  // ajax get function to load tweets
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(function(tweetData) {
      renderTweets(tweetData);
    });
  };

  // disallows cross site scripting
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // initalizes the page
  loadTweets();

  // displays error message if input is wrong, creates tweet if input is okay
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('.error-msg').slideUp();
    let queryString = $('form').serialize();
    queryString = queryString.slice(5);
    const englishQueryString = queryString.replaceAll('%20',' ');
    if (englishQueryString.length === 0) {
      $('.error-msg').slideDown();
    } else if (englishQueryString.length > 140) {
      $('.error-msg').slideDown();
    } else {
      $('.error-msg').slideUp();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $('form').serialize()
      }).then(() => {
        $('form')[0].reset();
        location.reload();
      });
    }
  });

  //using the compose button to hide/show tweet generator
  $('.fa-angles-down').click(function(event) {
    event.preventDefault();
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').slideDown();
    } else if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp();
    }
  });
});