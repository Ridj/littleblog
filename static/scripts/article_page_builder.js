(function() {
  // Footer listener
  addFooterListeners('closed');

  // Color scheme selector
  setColorSchemeSelector();

  // Login button listeners
  addBlogHeaderListeners();

  // "Dancing border" issue fix for Edge/IE
  let userAgent = navigator.userAgent;
    if (~userAgent.indexOf('.NET') || ~userAgent.indexOf('Edge')) {
     let css = '.new_comment:hover {border-top-left-radius: 15% 20px;' +
                                   'border-bottom-right-radius: 15% 20px;}';
      let style = document.createElement('style');
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild( document.createTextNode(css) );
        }
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();
