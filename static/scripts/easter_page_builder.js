(function () {
  addFooterListeners('deep_h');
  let header = document.getElementsByClassName('header')[0];
  header.classList.add('deep_h');
    header.addEventListener('mouseenter', function() {
      header.classList.remove('deep_h');
    });

    header.addEventListener('mouseleave', function() {
      header.classList.add('deep_h');
    })
})();