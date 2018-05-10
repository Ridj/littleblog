(function() {
  // Disclaimer listener
  addDisclaimerListeners();

  // Footer opacity listener
  setTimeout(function() {
    addFooterListeners('closed_h');
  }, 2000);

    // "Close" button fix for Firefox
    if (~navigator.userAgent.indexOf('Firefox')) {
      document.getElementsByClassName('d__closer')[0].style.top = '-10px';
    }
})();
