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
});