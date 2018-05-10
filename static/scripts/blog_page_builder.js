(function() {
  // Footer listener
  addFooterListeners('closed_h');

  // Login button listener
  addBlogHeaderListeners();

  // Articles theme selector
  createThemeSelector();

  // Theme selector listener
  closeSelectorOnLeaveMouse();

  // "Create article" button fix for Edge/IE
  let userAgent = navigator.userAgent;
    if (~userAgent.indexOf('.NET') || ~userAgent.indexOf('Edge')) {
      document.getElementsByClassName('create_blog')[0].style
                                       .paddingBottom = '.5vh';
    }
})();
