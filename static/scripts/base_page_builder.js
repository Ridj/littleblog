(function() {
  // Header, Menu & Selector listeners, drag ability remover
  addHeaderListeners();
  addNoDragListeners();
  closeMenuOnLeaveMouse();
  document.body.addEventListener('click', listenerBody);

  // Window height listener (fixed footer)
  setTimeout(checkScrollBar, 10);
  window.addEventListener('resize', checkScrollBar, false);

  // Data position fix for Firefox
  if (~navigator.userAgent.indexOf('Firefox')) {
    let created = document.getElementsByClassName('data_created');
      for (let i = 0; i < created.length; i++) {
        created[i].style.top = '0vw'
      }
    let modified = document.getElementsByClassName('data__modified');
      for (let i = 0; i < modified.length; i++) {
        modified[i].style.top = '2.4vw'
      }
  }
})();
