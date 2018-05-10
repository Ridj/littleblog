(function() {
  // Drag ability remover
  let button = document.getElementsByClassName('error_link')[0];
    button.ondrag = button.ondragdrop = button.ondragstart = function() {
      event.preventDefault();
      return false;
    };
})();
