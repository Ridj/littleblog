(function() {
  // Names field listener
  addContactsHover();

  // Font fixer for FF/IE/Edge
  let userAgent = navigator.userAgent;
    if ( ~userAgent.indexOf('Firefox') ||
         ~userAgent.indexOf('.NET')    ||
         ~userAgent.indexOf('Edge')       ) {
      document.querySelector('.developers_fieldset legend')
                              .style.fontFamily = 'Impact fantasy';
    }
})();
