// Login button's opacity toggle on header's hover
function addBlogHeaderListeners() {
  let header = document.getElementsByClassName('header')[0];
    header.addEventListener('mouseenter', function() {
      document.getElementsByClassName('header__log_buttons')[0]
                                       .classList.remove('closed_h');
    });
    header.addEventListener('mouseleave', function() {
      document.getElementsByClassName('header__log_buttons')[0]
                                       .classList.add('closed_h');
    });
}


// Names opacity toggle on dev-block hover
function addContactsHover() {
  let devs = document.getElementsByClassName('show_info');
  console.log(devs)
    for (let i = 0; i < devs.length; i++) {
      devs[i].addEventListener('mouseenter', function() {
        document.getElementsByClassName('name_dark')[i]
                                        .classList.add('name_transparent');
      });
      devs[i].addEventListener('mouseleave', function() {
        document.getElementsByClassName('name_dark')[i]
                                        .classList.remove('name_transparent');
      })
    }
}


// Disclaimer display buttons
function addDisclaimerListeners() {
  let disclaimers = document
                    .getElementsByClassName('content__disclaimer_control');
    for (let i = 0; i < disclaimers.length; i++) {
      disclaimers[i].onclick = toggleDisclaimer;
    }
}


// On footer's hover: footer opacity, logos reverse & scale
function addFooterListeners(class_name) {
  let footer = document.getElementsByClassName('footer')[0];
    footer.classList.add(class_name);

    footer.onmouseenter = function() {
      footer.classList.remove(class_name);
      document.getElementsByClassName('footer__logo')[0]
                                      .classList.add('logo_reversed');
      document.getElementsByClassName('footer__logo_me')[0]
                                      .classList.add('logo_scale');
    };
    footer.onmouseleave = function() {
      footer.classList.add(class_name);
      document.getElementsByClassName('footer__logo')[0]
                                      .classList.remove('logo_reversed');
      document.getElementsByClassName('footer__logo_me')[0]
                                      .classList.remove('logo_scale');
    };
}


// On header's hover logo reverse & title's scale
function addHeaderListeners() {
  let header = document.getElementsByClassName('header')[0];
    header.onmouseenter = function() {
      document.getElementsByClassName('header__logo')[0]
                                      .classList.add('logo_reversed_h');
      document.getElementsByClassName('header__title')[0]
                                      .classList.add('title_scale');
    };
    header.onmouseleave = function() {
      document.getElementsByClassName('header__logo')[0]
                                      .classList.remove('logo_reversed_h');
      document.getElementsByClassName('header__title')[0]
                                      .classList.remove('title_scale');
    };
}


// Cycle objects and adds no-drag option
function addListenersCycle(nodelist) {
  for (let i = 0; i < nodelist.length; i++) {
    let node = nodelist[i];
    node.ondrag = node.ondragdrop = node.ondragstart = preventDrag;
  }
}


// Setting no drag option for images & links
function addNoDragListeners() { 
  let nodelist = document.getElementsByTagName('img');
  addListenersCycle(nodelist);

  nodelist = document.getElementsByTagName('a');
  addListenersCycle(nodelist);
}


// User's name animation randomizer
function animateName(name) {
  let num = name.length;
  let styles = [
    ['balance ', 's ease-out 2; transform-origin: 0 100% 0'],
    ['shrinkjump ', 's ease-in-out 2; transform-origin: bottom center'],
    ['falling ', 's ease-out 2; transform-origin: bottom center'],
    ['rotate ', 's ease-out 2'],
    ['toplong ', 's linear 2'],
  ];
  let colors = ['bisque', 'black', 'lavander', 'burlywood', 'darkgrey',
    'red', 'magenta', 'fuchsia', 'lightcoral', 'orangered',
    'green', 'yellow', 'greenyellow', 'darkolivegreen', 'springgreen',
    'blue', 'blueviolet', 'cyan', 'dodgerblue', 'lightsteelblue'
  ];
  let css = '';

  let h_name = document.getElementsByClassName('header__name')[0];
    for (let i = 0; i < num; i++) {
      let letter = document.createElement('span');
        letter.textContent = name[i];
        letter.classList.add('letters_animation' + i);
        let styleNow = styles[Math.floor(Math.random() * 4.99)];
        css += '.letters_animation' + i + '.active {animation: ' +
          styleNow[0] + (1 + Math.floor(Math.random() * 20) / 10) + styleNow[1] +
          '; color: ' + colors[Math.floor(Math.random() * 19.99)] +  ';} ' +
          '.letters_animation' + i + ' {color: ' +
          colors[Math.floor(Math.random() * 19.99)] +  ';}';

        letter.addEventListener('animationend', () => {
		      event.target.classList.remove('active');
	      });
        setTimeout(() => {
          letter.classList.add('active');
          }, Math.floor(Math.random() * 3000));

      if (name[i] === ' ') {
        letter.innerHTML = '<pre> </pre>'
      }
      h_name.appendChild(letter)
    }

    h_name.addEventListener('click', function() {
      document.location.href = "/blog/page/1?author=" + name;
    });

  let header = document.getElementsByClassName('header')[0];
    header.addEventListener('mouseleave', function() {
      let spans = document.querySelectorAll('.header__name span');
        for (let i = 0; i < spans.length; i++) {
          spans[i].classList.add('active');
        }
    });

    header.addEventListener('mouseenter', function() {
      let spans = document.querySelectorAll('.header__name span');
        for (let i = 0; i < spans.length; i++) {
          spans[i].classList.remove('active');
        }
    });

    css += '.header__name {width: calc(' + num + 'vw + ' + num + '0px)}';
  let style = document.createElement('style');
    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.appendChild( document.createTextNode(css) );

  document.getElementsByTagName('head')[0].appendChild(style);
}


// Login field opener & elements reactions
function cancelLogIn() {
  document.getElementsByClassName('log-in-form-div')[0]
    .classList.toggle('open');
  document.getElementsByClassName('header__button')[0]
    .classList.toggle('open');

  let toggle = document.getElementsByClassName('select_color_scheme')[0];
    if (toggle) {
      toggle.classList.toggle('selector_toggle');
    }

  let span = document.querySelector('.header__title span');
    if (span) {
      span.classList.toggle('author_toggle');
    }

  let button = document.getElementsByClassName('create_blog')[0];
    if (button) {
      if (button.innerHTML === 'Войдите, пожалуйста!') {
        button.innerHTML = 'Новый блог';
      } else {
        button.innerHTML = 'Войдите, пожалуйста!';
      }
    }
}


// Article's delete confirmation buttons
function cancelBlogDelete(blog_id) {
  let button = document.getElementById('delete_blog');
    button.innerHTML = 'Удалить';
    button.onclick = function() {
      confirmBlogDelete(blog_id);
    };

  button = document.getElementById('edit_blog');
    button.innerHTML = 'Изменить';
    button.onclick = editBlog;
}


// New source files for red color scheme
function changeColorsForLogoAndMenut() {
  if (!document.getElementsByClassName('red_scheme_body')[0]) {
    document.getElementsByClassName('footer__logo')[0]
                                    .src = '/static/images/article/logo.png';
    document.getElementsByClassName('header__logo')[0]
                                    .src = '/static/images/article/logo.png';
    document.getElementById('menu-icon')
                                    .src = '/static/images/article/menu.png';
  } else {
    document.getElementsByClassName('footer__logo')[0]
                                    .src = '/static/images/logo.png';
    document.getElementsByClassName('header__logo')[0]
                                    .src = '/static/images/logo.png';
    document.getElementById('menu-icon')
                                    .src = '/static/images/menu.png';
  }
}


// Penult article visibility for start page
function checkHideBlogVisibility() {
  if (document.documentElement.offsetHeight >
                        1.2 * document.documentElement.offsetWidth) {
    document.getElementsByClassName('blog__article')[0]
                                    .classList.remove('hide_blog');
  } else {
    document.getElementsByClassName('blog__article')[0]
                                    .classList.add('hide_blog');
  }
}


// Footer & painting fixer
function checkScrollBar() {
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  if (document.documentElement.clientHeight >= scrollHeight) {
    if (document.getElementsByClassName('content__painting')[0]) {
      document.getElementsByClassName('content__painting')[0].style
                                                  .width = '100vw';
    }
    document.getElementsByClassName('footer')[0].classList.add('footer_fixed');
  } else {
    if (document.getElementsByClassName('content__painting')[0]) {
      document.getElementsByClassName('content__painting')[0].style
                                                  .width = 'calc(100vw - 12px)';
    }
    document.getElementsByClassName('footer')[0].classList.remove('footer_fixed');
  }
}


// Menu closer listener on mouseleave
function closeMenuOnLeaveMouse() {
  let timeout;
  let opacityTimeout;
  let menu = document.getElementsByClassName('header__menu')[0];
    menu.addEventListener('mouseleave', timersOn);
    menu.addEventListener('mouseenter', timersOff);

  function timersOn() {
    timeout = setTimeout(function() {
      toggleMenu();
      menu.style.opacity = 1;
    }, 1250);
    opacityTimeout = setTimeout(function() {
      menu.style.opacity = 0;
    }, 500)
  }

  function timersOff() {
    clearTimeout(timeout);
    clearTimeout(opacityTimeout);
    menu.style.opacity = 1;
  }

  document.body.addEventListener('click', function() {
    timersOff();
  });
}


// Theme selector closer listener on mouseleave
function closeSelectorOnLeaveMouse() {
  let timeout;
  let opacityTimeout;
  let select = document.getElementsByClassName('custom-select')[0];
  let selector = document.getElementsByClassName('select-items')[0];
    selector.addEventListener('mouseleave', timersOn);
    selector.addEventListener('mouseenter', timersOff);

  function timersOn() {
    timeout = setTimeout(function() {
      selector.classList.toggle('select-hide');
      select.classList.toggle("select-arrow-active");
      selector.style.opacity = 1;
    }, 2000);
    opacityTimeout = setTimeout(function() {
      selector.style.opacity = 0;
    }, 1500)
  }

  function timersOff() {
    clearTimeout(timeout);
    clearTimeout(opacityTimeout);
    selector.style.opacity = 1;
  }
  document.body.addEventListener('click', function() {
    timersOff();
  });
}


// Article's deletion
function confirmBlogDelete(blog_id) {
  let button = document.getElementById('delete_blog');
    button.innerHTML = 'Вы уверены?';
    button.onclick = (function () {
      deleteBlog(blog_id);
    });

  button = document.getElementById('edit_blog');
    button.innerHTML = 'Отменить';
    button.onclick = (function () {
      cancelBlogDelete(blog_id);
    });
}


// New article link
function createNewBlog() {
  document.location.href = "/blog/?action=constructor";
}


// Login error message
function createErrorMessage() {
  let p = document.createElement('p');
    p.innerHTML = 'Ошибка авторизации: неверный логин или пароль';
    p.classList.add('login_error');

  return p;
}


// Theme selector option creator
function createOption(index) {
  let options = ['all', 'Все', 'Учёба', 'Компьютер', 'Разное'];
  let option = document.createElement('div');
    option.innerHTML = options[index];
    option.addEventListener('click', function() {
      let theme = index === 1 ? options[0] : options[index];
      document.location.href = "/blog/page/1?theme=" + theme;
    });

  return option;
}


// Create single page span with a link & style
function createPageSpan(num, current, typo, theme, author) {
  let span = document.createElement('span');
  if (author !== '') author = '&author=' + author ;
    span.textContent = num;
    if (num === current) {
      span.id = 'current_page' + typo;
    } else if (num === 0 || num === -1) {
      span.textContent = '...';
      span.id = 'pages_dots'+(num+1);
    } else {
      span.title = 'Страница ' + num;
      span.onclick = function() {
        document.location.href = "/blog/page/" + num + '?theme=' + theme + author;
      };
    }

  return span;
}


// Theme selector - head creation
function createSelectHead() {
  let select = document.createElement('div');
    select.classList.add('custom-select');
    select.id = 'custom-select';
    select.innerHTML = 'Раздел';
    select.onclick = function() {
      this.nextElementSibling.classList.toggle('select-hide');
      this.classList.toggle("select-arrow-active");
    };

  return select;
}


// Theme selector - filling with options
function createSelectOptions() {
  let selected = document.createElement('div');
    selected.setAttribute('class', 'select-items select-hide');
    for (let i = 1; i < 5; i++) {
      selected.appendChild(createOption(i));
    }

  return selected;
}


// Theme selector - creation init
function createThemeSelector() {
  let custom_select = document.getElementsByClassName('select_theme')[0];
    custom_select.appendChild(createSelectHead());
    custom_select.appendChild(createSelectOptions());
}


// Delete article link
function deleteBlog(blog_id) {
  document.location.href = "/blog/?action=delete&blog_id=" + blog_id;
}


// Filter article from bad symblos
function fillBlogContent(blog_id, text) {
  document.getElementById(blog_id).innerHTML = replaceBadSymbols(text);
}


// Filter comment from bad symbols
function fillCommentsContent(node, text) {
  node.textContent = replaceBadSymbols(text);
}


// A help function to find rendering pages
function findPagesToRender(count, current) {
  if (current === 1 || current === 2 || current ===  3) {
    return [1, 2, 3, 4, -2, 0, count];
  } else if (current === count || current === count-1 || current ===  count-2) {
    return [1, -2, 0,  count-3, count-2, count-1, count];
  } else {
    return [1, -1, current-1, current, current+1, 0, count];
  }
}


// Body listener for menu & selector closed on click
function listenerBody(e) {
    if ( !(e.target.id === 'menu-icon') &&
              document.querySelector('.header__menu.open') ) {
      console.log(e.target.id);
      toggleMenu();
    }
    if ( document.getElementsByClassName('select-items')[0] &&
              !(e.target.classList.contains('custom-select')) &&
              !document.getElementsByClassName('select-hide')[0] ) {
      document.getElementsByClassName('select-items')[0]
                                       .classList.add('select-hide');
    }
}


// Authentication error handler
function logErrorScript() {
  cancelLogIn();

  let form = document.getElementsByClassName('log-in-form-form')[0];
    form.insertBefore(createErrorMessage(), form.children[0]);
}


// Prevent default action
function preventDrag() { 
  event.preventDefault();
  return false;
}


// Registration link with buffer
function registerUser(path) {
  document.location.href = "/register/?next=" + path;
}


// Replacer for bad HTML symbols
function replaceBadSymbols(text) {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}


// Article restoration link
function restoreBlog(deleted_id) {
  document.location.href = "/blog/?action=restore&deleted_id=" + deleted_id;
}


// Set author query links
function setAuthorLinks(theme) {
  let authors = document.querySelectorAll('.blog__author b');
    if (theme !== '') theme = 'theme=' + theme + '&';
    for (let i = 0; i < authors.length; i++) {
      authors[i].parentNode.onclick = function () {
        document.location.href = "/blog/page/1?" + theme + "author=" +
          authors[i].innerHTML;
      }
    }
}


// Color scheme selector checker
function setColorSchemeSelector() {
  let checkbox = document.querySelector('.select_color_scheme input');
    if ("onpropertychange" in checkbox) {
      checkbox.onpropertychange = function () {
        if (event.propertyName === "checked") {
          toggleColorScheme();
        }
      };
    } else {
        checkbox.onchange = function () {
          toggleColorScheme();
        };
    }
}


// Set comments default name to login user
function setDefaultCommentaryName(name) {
  document.querySelector('.comments_outer_form input[type="text"]')
    .value = name;
}


// Image-animation intervals setting for single image
function setHideInterval(node, up, down) {
  setTimeout(function() {
    setOpacityUp(node);
    setInterval(function() {
      setOpacityUp(node);
      }, 15000);

    setTimeout(function() {
      setOpacityDown(node);
      setInterval(function() {
        setOpacityDown(node);
        }, 15000);
    }, down)
  }, up)
}


// Image-animation interval setting
function setHideIntervalsToImages() {
  setHideInterval(document.getElementById('image_110'), 1000, 6500);
  setHideInterval(document.getElementById('image_111'), 2500, 5000);
  setHideInterval(document.getElementById('image_112'), 4000, 3500);
  setHideInterval(document.getElementById('image_113'), 5500, 2000);
  setHideInterval(document.getElementById('image_120'), 2500, 11500);
  setHideInterval(document.getElementById('image_130'), 11000, 2500);
  setHideInterval(document.getElementById('image_210'), 2500, 6350);
  setHideInterval(document.getElementById('image_211'), 3500, 5000);
  setHideInterval(document.getElementById('image_212'), 4500, 4000);
  setHideInterval(document.getElementById('image_213'), 6000, 2850);
  setHideInterval(document.getElementById('image_220'), 6500, 8000);
  setHideInterval(document.getElementById('image_230'), 12000, 2500);
  setHideInterval(document.getElementById('image_310'), 250, 6000);
  setHideInterval(document.getElementById('image_320'), 3000, 3500);
  setHideInterval(document.getElementById('image_330'), 9500, 5850);
  setHideInterval(document.getElementById('image_331'), 11000, 1700);
  setHideInterval(document.getElementById('image_332'), 12500, 1500);
  setHideInterval(document.getElementById('image_333'), 14000, 1450);
}


// Set query link includes author & theme for pages
function setLink(node, author) {
  if (author !== '') author = '&author=' + author;
  node.onclick = function() {
    let theme;
    if (~node.textContent.indexOf('Учёба')) theme = 'Учёба';
    else if (~node.textContent.indexOf('Компьютер')) theme = 'Компьютер';
    else theme = 'Разное';
    document.location.href = "/blog/page/1?theme=" + theme + author;
  }
}


// Login button setter
function setLogInButton() {
  let button = document.getElementsByClassName('header__login')[0];
    button.onclick = cancelLogIn;
    button.title = 'Войти';
}


// Logout button setter
function setLogOutButton(user) {
  let button = document.getElementsByClassName('header__login')[0];
    button.onclick = userLogOut;
    button.title = user + ' (выйти)';
  setStyleOfLogOutButton();
}


// Opacity zero setter
function setOpacityDown(node) {
  node.style.opacity = '0';
}


// Opacity one setter
function setOpacityUp(node) {
  node.style.opacity = '1';
}


// Set links for pages
function setPagesListeners(count, current, theme, author) {
  let pages = document.getElementsByClassName('blog__pages');
    for (let i = 0; i < pages.length; i++) {
      if (count < 6) {
        for (let j = 1; j <= count; j++) {
          pages[i].appendChild(createPageSpan(j, current, i, theme, author));
        }
      } else {
        let pagesToRender = findPagesToRender(count, current);
          for (let j = 0; j < pagesToRender.length; j++) {
            if (pagesToRender[j] === -2) continue;
            pages[i].appendChild(createPageSpan(pagesToRender[j], current,
                                                          i, theme, author));
          }
      }
    }
}


// Set login button if user is authenticated
function setStyleOfLogOutButton() {
  let style = document.createElement('style');
  let css = '.header__switcher:before {' +
             'background: radial-gradient(40% 35%, green, lawngreen 60%)} ' +
             '.header__switcher:hover {' +
             'background: linear-gradient(to right top, lavender, bisque)}';
    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.appendChild( document.createTextNode(css) );

  document.getElementsByTagName('head')[0].appendChild(style);
}


// Set theme links & depandence to selected author
function setThemeLinks(author) {
  let themes = document.getElementsByClassName('blog__theme');
    for (let i = 0; i < themes.length; i++) {
      setLink(themes[i], author);
    }
}


// Theme option links setting
function setThemeMainLinks() {
  let links = document.getElementsByClassName('img__block');
  links[0].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Учёба";
  });
  links[1].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Компьютер";
  });
  links[2].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Разное";
  });
}


// Developers info opener
function toggleAbout(field) {
  document.getElementsByClassName('developers_info')[field].classList.toggle('open');
}


// Color scheme changer
function toggleColorScheme() {
  changeColorsForLogoAndMenut();
  document.getElementsByTagName('body')[0].classList.toggle('red_scheme_body');
  document.getElementsByClassName('header')[0].classList.toggle('red_scheme_header');
  document.getElementsByClassName('header__title')[0].classList.toggle('red_scheme_header_title');
  document.getElementsByClassName('footer')[0].classList.toggle('red_scheme_footer');
  document.getElementsByClassName('blog__article')[0].classList.toggle('red_scheme_border');
  document.querySelector('.blog__article legend').id = 'article_legend';
  document.querySelector('.blog__article legend').classList.toggle('red_scheme_legend');
  if (document.getElementsByClassName('no_comments_yet')[0]) {
    document.getElementsByClassName('no_comments_yet')[0].classList.toggle('red_scheme_no_com');
  }
  document.getElementsByClassName('header__switcher')[0].classList.toggle('red_scheme_login');

  let data = document.getElementsByClassName('blog__data');
    for (let i = 0; i < data.length; i++) {
      data[i].classList.toggle('red_scheme_data');
    }
}


// Disclaimer & d_opener toggle
function toggleDisclaimer() {
  document.getElementsByClassName('content__disclaimer')[0].classList.toggle('open');
  document.getElementsByClassName('d__opener')[0].classList.toggle('open');
}


// Info opener
function toggleInfo(who) {
  let info = document.querySelector(who);
    info.classList.toggle('open');
}


// Menu opener
function toggleMenu() {
  let menu = document.getElementsByClassName('header__menu')[0];
    menu.classList.toggle('open');
}


// Logout link
function userLogOut() {
  document.location.href = "/blog/?action=logout";
}


// Edit article link
function editBlog() {}
function clearBackup() {
  document.location.href = "/easteregg/?action=cdb";
}