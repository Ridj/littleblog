(function() {
  // Image-boxes animation
  setHideIntervalsToImages();

  // Penult article's visibility test
  checkHideBlogVisibility();
  window.addEventListener('resize', function() {
    setTimeout(checkHideBlogVisibility, 1);
  }, false);

  // Footer opacity listener
  setTimeout(function() {
    addFooterListeners('closed_h');
  }, 1000);
})();
