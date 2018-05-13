(function() {
  // Footer listener
  addFooterListeners('closed_h');

  // Invisible menu fix
  setWhiteMenu();
  regWordsRanomizer(1);

  // Button's margin bug fix for Edge/IE
  let userAgent = navigator.userAgent;
    if ( ~userAgent.indexOf('.NET') || ~userAgent.indexOf('Edge') ) {
      document.querySelector('input[type="submit"]').style
                             .fontFamily = 'Impact fantasy';
    }
})();
