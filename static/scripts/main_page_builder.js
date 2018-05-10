(function() {
  // Articles links
  setAuthorLinks('');
  setThemeMainLinks();

  // Image-boxes animation
  setHideIntervalsToImages();

  // Penult article's visibility test
  checkHideBlogVisibility();
  window.addEventListener('resize', checkHideBlogVisibility, false);

  // Footer opacity listener
  setTimeout(function() {
    addFooterListeners('closed');
  }, 1000);
})();
