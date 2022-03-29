$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const siblingElem = this.nextElementSibling;
    const childrenElem = siblingElem.querySelector('.counter');
    childrenElem.value = 140 - (this.value.length);
    if (childrenElem.value < 0) {
      $(childrenElem).removeClass('positive');
      $(childrenElem).addClass('negative');
    } else {
      $(childrenElem).removeClass('negative');
      $(childrenElem).addClass('positive');
  }
  });

  $('.tweet-container').hover(
    function() {
      $(this).addClass('box-shadow');
    }, function() {
      $(this).removeClass('box-shadow');
    }
  );

  $('.fa-flag').hover(
    function() {
      $(this).addClass('makeRed');
    }, function() {
      $(this).removeClass('makeRed');
    }
  );

  $('.fa-retweet').hover(
    function() {
      $(this).addClass('makeRed');
    }, function() {
      $(this).removeClass('makeRed');
    }
  );

  $('.fa-heart').hover(
    function() {
      $(this).addClass('makeRed');
    }, function() {
      $(this).removeClass('makeRed');
    }
  );
});

