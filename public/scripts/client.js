/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $('.errorMsg').hide();

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
  
  const renderTweets = function(data) {
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('.tweety-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(function(tweetData){
      renderTweets(tweetData);
    })
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();

  $('form').on('submit', function(event){
    event.preventDefault();
    $('.errorMsg').slideUp();
    if ($('form').serialize().length === 5) {
      $('.errorMsg').slideDown();
    } else if ($('form').serialize().length > 145) {
      $('.errorMsg').slideDown();
    } else {
      $('.errorMsg').slideUp();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $('form').serialize()
      }).then(() => {
        $('form')[0].reset();
        location.reload();
      })
    }
  })

  $('.fa-angles-down').click(function(event){
    event.preventDefault();
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').slideDown();
    } else if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp();
    }
  })
});