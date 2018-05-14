(function () {
  let icon = document.getElementsByClassName('header__menu_icon')[0];
  let menu = document.getElementsByClassName('header__menu')[0];
    document.body.appendChild(icon);
    document.body.appendChild(menu);

  setHelpHovers();
  addDisclaimerListenersConstructor();
})();
