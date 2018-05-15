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


function addDisclaimerListenersConstructor() {
  document.getElementsByClassName('constructor__disclaimer_closer')[0].onclick =
    toggleDisclaimerConstructor;
  document.getElementsByClassName('constructor__disclaimer_opener')[0].onclick =
    toggleDisclaimerConstructor;
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
function animateName(name, opt=false) {
  let num = name.length;
  let css = '';

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
    let h_name;
    if (opt) {
      h_name = createSpan(opt);
      document.body.appendChild(h_name);
    } else {
      h_name = document.getElementsByClassName('header__name')[0];
    }

  css += createLettersForAnimation(name, num, styles, colors, h_name, css, opt);

    if (opt === false) {
      let header = document.getElementsByClassName('header')[0];
        h_name.addEventListener('click', function() {
          document.location.href = "/blog/page/1?author=" +
            name + checkColorScheme();
        });

        header.addEventListener('mouseleave', function() {
          let spans = document.querySelectorAll('.header__name span');
            for (let i = 0; i < spans.length; i++) {
              if (!spans[i].classList.contains('active')) {
                spans[i].classList.add('active');
              }
            }
        });

      css += '.header__name {width: calc(' + num + 'vw + ' + num + '0px)}';
    } else {
      if (opt === 1) {
        window.addEventListener('keydown', function () {
          let spans = document.getElementsByClassName('curious_span');
          setTimeout(function () {
          }, 1000);
          for (let i = 0; i < spans.length; i++) {
            for (let j = 0; j < spans[i].children.length; j++) {
              spans[i].children[j].innerHTML =
                regWordsRanomizer(spans[i].children[j].innerHTML);
            }
            spans[i].style.top = (15 + ~~(Math.random() * 75)) + 'vh';
            spans[i].style.left = (10 + ~~(Math.random() * 80)) + 'vw';
          }
        }, false);
        css += '.curious_span {width: calc(' + num + 'vw + ' + num + '0px)}';
      } else {
        h_name.addEventListener('mouseenter', function () {
          let spans = document.querySelectorAll('.curious_span span');
          for (let i = 0; i < spans.length; i++) {
            if (!spans[i].classList.contains('active')) {
              spans[i].classList.add('active');
              spans[i].style.opacity = 1;
            }
          }
        });
        css += '.curious_span {width: calc(' + ~~(num/2.5) + 'vw + ' + ~~(num/3) + '0px)}';
      }
    }

  if (opt === 1) {
    let res = [[50, 45], [85, 5], [85, 75], [35, 75], [35, 5]];
    let spans = document.getElementsByClassName('standart_let');
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.top = res[i][0] + 'vh';
        spans[i].style.left = res[i][1] + 'vw';
      }
  }

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
    button.onclick = function() {
      editBlog(blog_id);
    };
}


// Help function for lazy dynamic links
function checkColorScheme() {
  let scheme = "&scheme=day";
    if (document.querySelector('.select_color_scheme input').checked) scheme =
      "&scheme=night";

  return scheme;
}


// --deprecated--
function checkHeader() {
  let header = document.getElementsByClassName('header')[0];
  let width = document.documentElement.offsetWidth;
  if (width > header.getBoundingClientRect().width) {
    header.style.width = width + 'px';
  }
}


// Switcher between article & blogs view for constructor
function changeConstructorView() {
  let article = document.getElementsByClassName('blog__article')[0];
    article.classList.toggle('art_add');
    article.children[2].classList.toggle('view_vis');

  document.getElementsByClassName('content__painting')[0]
    .classList.toggle('view_vis');
  document.getElementsByClassName('view_inner')[0]
    .classList.toggle('bord_bottom');
  document.getElementsByClassName('view')[0]
    .classList.toggle('view__globe');


  let view = document.getElementsByClassName('view_button')[0];
    if (view.innerHTML === '🌐') {
      view.innerHTML = '💠';
    } else {
      view.innerHTML = '🌐';
    }
}


// Penult article visibility for start page --optimized--
function checkHideBlogVisibility() {
  let height = document.documentElement.offsetHeight;
  let div = document.getElementsByClassName('main__images_block')[0];
  let available = height - div.getBoundingClientRect().bottom - 70;
  let articles = document.getElementsByClassName('blog__article');
  if (height / available < 2) {
    for (let i = 0; i < articles.length; i++) {
      articles[i].style.maxHeight = (available / 2 - 50) + 'px';
    }
    articles[0].classList.remove('hide_blog');
  } else {
    for (let i = 0; i < articles.length; i++) {
      articles[i].style.maxHeight = '33vh';
    }
    articles[0].classList.add('hide_blog');
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

function checkMobilesWidth() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent)) {
      document.getElementsByClassName('content__painting')[0].style
                                                  .width = '100vw';
      document.getElementsByClassName('content')[0].style
                                                  .width = '100vw';
      document.body.style.width = '100vw';
  }
}


// Clears all articles by name
function clearAllByName(scheme) {
  let name = document.getElementById('delete_name').value;
    if (name.length > 3) {
      document.location.href = "/easteregg/?action=cbbn&author=" +
        name + '&scheme=' + scheme;
    }
}


// Clears DELETED data base
function clearBackup(scheme) {
  document.location.href = "/easteregg/?action=cdb&scheme=" + scheme;
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


// Login error message
function createErrorMessage() {
  let p = document.createElement('p');
    p.innerHTML = 'Ошибка авторизации: неверный логин или пароль';
    p.classList.add('login_error');

  return p;
}


// Help function -  creates letters and sets styles for it
function createLettersForAnimation(name, num, styles, colors, h_name, css, opt) {
  for (let i = 0; i < num; i++) {
    let styleNow = styles[Math.floor(Math.random() * 4.99)];
    let letter = document.createElement('span');
      letter.textContent = name[i];
      if (opt !== 1 || Math.random() >.5) {
        letter.classList.add('letters_animation' + i);
        css += '.letters_animation' + i + '.active {animation: ' + styleNow[0] +
          (1 + Math.floor(Math.random() * 20) / 10) + styleNow[1] + '; color: ' +
          colors[Math.floor(Math.random() * 19.99)] + ';} ' + '.letters_animation' +
          i + ' {color: ' + colors[Math.floor(Math.random() * 19.99)] + ';}';

        if (opt === 1) {
          letter.addEventListener('animationend', () => {
            event.target.classList.remove('active');
            setTimeout(() => {
              letter.classList.add('active');
            }, Math.floor(Math.random() * 3000));
        });

        }
        letter.addEventListener('animationend', () => {
		      event.target.classList.remove('active');
        });

        setTimeout(() => {
          letter.classList.add('active');
        }, Math.floor(Math.random() * 3000));
      } else {
        letter.classList.add('active')
      }
      if (name[i] === ' ') { letter.innerHTML = '<pre> </pre>' }

    h_name.appendChild(letter);
  }
  if (opt === 1) h_name.classList.add('standart_let');
  return css;
}


// New article link
function createNewBlog() {
  document.location.href = "/blog/?action=constructor" + checkColorScheme();
}


// Theme selector option creator
function createOption(index) {
  let options = ['all', 'Все', 'Учёба', 'Компьютер', 'Разное'];
  let option = document.createElement('div');
    option.innerHTML = options[index];
    option.addEventListener('click', function() {
      let theme = index === 1 ? options[0] : options[index];
      document.location.href = "/blog/page/1?theme="
        + theme + checkColorScheme();
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
        document.location.href = "/blog/page/" + num + '?theme=' + theme
          + author + checkColorScheme();
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


// Help function for words animation
  function createSpan(opt) {
    let span = document.createElement('span');
      span.className = 'curious_span';
        span.style.top = (25 + ~~(Math.random() * 60)) + 'vh';
        span.style.left = (5 + ~~(Math.random() * 70)) + 'vw';

      span.addEventListener('mouseenter', (function() {
        if (opt === 1) {
          if (parseInt(getComputedStyle(span).top) >
            document.documentElement.offsetHeight / 1.5) {
            span.style.left = ~~(Math.random() * 70) + 'vw';
          } else {
            span.style.top = (25 + ~~(Math.random() * 60)) + 'vh';
          }
          span.style.transform = "scale(" + (1 + (100 - ~~(Math.random() * 150))/100) + ")";
        } else {
          span.style.left = ~~(Math.random() * 90) + 'vw';
          span.style.top = (5 + ~~(Math.random() * 80)) + 'vh';
          span.style.transform = "scale(" + (1 + (150 - ~~(Math.random() * 200))/100) +
            ") rotate(" + ~~(Math.random() * 360) + "deg)";
        }

      }).bind(this), false);

    return span;
  }


// Theme selector - creation init
function createThemeSelector() {
  let custom_select = document.getElementsByClassName('select_theme')[0];
    custom_select.appendChild(createSelectHead());
    custom_select.appendChild(createSelectOptions());
}


// Function to create random word from alphabet
function createWord(letters) {
  let word = '';
  let lang = letters[~~(Math.random() * 1.99)];
  let length = 4 + ~~(Math.random() * 10.99);
    for (i = 0; i < length; i++) {
      word += lang[~~(Math.random() * lang.length - 0.01)];
    }

  length = ~~(Math.random() * 4.99);
    if (word.length < 8) {
      for (i = 0; i < length; i++) {
        word += letters[2][~~(Math.random() * 9.99)];
      }
    }

  return word;
}


// Create crazy animantion
function deleteAllAnimations() {
  let curious = document.getElementsByClassName('curious_span');
    for (let i = curious.length - 1; i >= 0; i--) {
      document.body.removeChild(curious[i]);
    }
}


// Delete article link
function deleteBlog(blog_id) {
  document.location.href = "/blog/?action=delete&blog_id="
    + blog_id + checkColorScheme();
}


// Edit article link
function editBlog(blog_id) {
  document.location.href = "/blog/post/" + blog_id + "/?action=constructor" +
    checkColorScheme();
}


// Filter article from bad symblos
function fillBlogContent(blog_id, text, flag=false) {
  document.getElementById(blog_id).innerHTML = replaceBadSymbols(text, flag);
}


// Filter comment from bad symbols
function fillCommentsContent(node, text) {
  node.textContent = replaceBadSymbols(text);
}


// Sets links on color scheme change
function findAndReplaceLinks(scheme) {
  let menu = document.querySelectorAll('.header__menu a');
    for (let i = 0; i < menu.length; i++) {
      menu[i].href = menu[i].href.slice(0, menu[i].href.indexOf('?scheme'))
        + scheme;
    }

  let blog = document.querySelectorAll('.blog__link a');
    for (let i = 0; i < blog.length; i++) {
      blog[i].href = blog[i].href.slice(0, blog[i].href.indexOf('?scheme'))
        + scheme;
    }
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


// Fixators for panels
function fixConstructorDrag() {
  document.getElementsByClassName('draggable')[0].classList.toggle('drag_fix');
  document.getElementsByClassName('fix_button')[2].classList.toggle('fix_on');
}


function fixConstructorMenu() {
  document.getElementsByClassName('menu')[0].classList.toggle('menu_fix');
  document.getElementsByClassName('fix_button')[1].classList.toggle('fix_on');
}


function fixConstructorView() {
  document.getElementsByClassName('view')[0].classList.toggle('view__fix');
  document.getElementsByClassName('fix_button')[0].classList.toggle('fix_on');
}


// Body listener for menu & selector closed on click
function listenerBody(e) {
    if ( (!(e.target.classList.contains('header__menu_icon') ||
      e.target.classList.contains('menu_h'))) &&
              document.querySelector('.header__menu.open') ) {
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
    document.location.href = "/register/?next=" + path + checkColorScheme();
}


// Alphabets for randomizer, initial random animation
function regWordsRanomizer(flag=false) {
  let letters = [
    'aбвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    'abcdefghijklmnopqrstuvwxuz',
    '1234567890'
  ];
  if (typeof flag === "string" && flag.length === 1) {
    for (let i = 0; i < letters.length; i++) {
      if (~letters[i].indexOf(flag)) {
        return letters[i][~~(Math.random() * letters[i].length - .01)]
      }
    }
  }

  if (flag === false) {
    for (let i = 0; i < ~~(1 + Math.random() * 6.99); i++) {
      animateName(createWord(letters), true);
    }
  } else if (flag === 1) {
    for (let i = 0; i < ~~(2 + Math.random() * 3.99); i++) {
      animateName(createWord(letters), flag)
    }
  }
}


// Replacer for bad HTML symbols
function replaceBadSymbols(text, flag=false) {
  if (flag) {
    return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
             .replace(/⤓/g, '⤓\n');
  }
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
             .replace(/⤓/g, '\n');
}


// Article restoration link
function restoreBlog(deleted_id, scheme) {
  document.location.href = "/blog/?action=restore&deleted_id="
    + deleted_id + '&scheme=' + scheme;
}


// Set author query links
function setAuthorLinks(theme, scheme) {
  let authors = document.querySelectorAll('.blog__author b');
    if (theme !== '') theme = 'theme=' + theme + '&';
    for (let i = 0; i < authors.length; i++) {
      authors[i].parentNode.onclick = function () {
        if (document.getElementsByClassName('select_color_scheme')[0]) {
          document.location.href = "/blog/page/1?" + theme + "author=" +
            authors[i].innerHTML + checkColorScheme();
        } else {
          document.location.href = "/blog/page/1?" + theme + "author=" +
            authors[i].innerHTML + '&scheme=' + scheme;
        }
      }
    }
}


function setBlackMenuToNight() {
  document.getElementsByClassName('header__logo')[0].src =
    document.getElementsByClassName(('footer__logo'))[0].
      src = '/static/images/logo.png';
}


// Color scheme selector checker
function setColorSchemeSelector(scheme) {
  let checkbox = document.querySelector('.select_color_scheme input');
    if (scheme === 'night') {
      checkbox.checked = true;
    }

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


function setHelpHovers() {
  let view = document.getElementsByClassName('view')[0];
  let drag = document.getElementsByClassName('draggable')[0];
  let menu = document.getElementsByClassName('menu')[0];

  setHelpArrowListeners(document.getElementsByClassName('up_ar')[0], view, 'view__fix');
  setHelpArrowListeners(document.getElementsByClassName('left_ar')[0], drag, 'drag_fix');
  setHelpArrowListeners(document.getElementsByClassName('right_ar')[0], menu, 'menu_fix');

  setHelpListeners(view, document.getElementsByClassName('up_help')[0]);
  setHelpListeners(drag, document.getElementsByClassName('left_help')[0]);
  setHelpListeners(menu, document.getElementsByClassName('right_help')[0]);
}


function setHelpArrowListeners(arrow, node, node_class) {
  arrow.onmouseenter = arrow.onmouseleave = function() {
    node.classList.toggle(node_class);
  };
}


function setHelpListeners(node, elem) {
  elem.addEventListener('mouseenter', function() {
    node.classList.add('help_anim');
  });

  elem.addEventListener('mouseleave', function() {
    node.classList.add('help_anim_1');
    node.addEventListener('animationend', function() {
      node.classList.remove('help_anim');
      node.classList.remove('help_anim_1');
    });
  });
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
    document.location.href = "/blog/page/1?theme=" + theme
      + author + checkColorScheme();
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
function setThemeMainLinks(scheme) {
  let links = document.getElementsByClassName('img__block');
  links[0].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Учёба"+ '&scheme=' + scheme;
  });
  links[1].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Компьютер" + '&scheme=' + scheme;
  });
  links[2].addEventListener('click', function() {
    document.location.href = "/blog/?theme=Разное" + '&scheme=' + scheme;
  });
}


// Developers info opener --smoth opacity edit--
function toggleAbout(field) {
  let dev = document.getElementsByClassName('developers_info')[field];
    if (dev.classList.contains('open')) {
      dev.style.opacity = '0';
      setTimeout(function() {
        dev.classList.toggle('open');
        dev.style.opacity = '1';
      }, 500)
    } else {
      dev.style.opacity = '0';
      dev.classList.toggle('open');
      setTimeout(function() {
        dev.style.opacity = '1';
      }, 50)
    }
}


// Color scheme changer --optimized--
function toggleColorScheme() {
  let scheme;
    if (document.body.classList.contains('red_scheme_body')) {
      scheme = '?scheme=day';
      document.body.classList.remove('red_scheme_body');
      setColorSchemeImages(1);
    } else {
      scheme = '?scheme=night';
      document.body.classList.add('red_scheme_body');
      setColorSchemeImages(0);
    }

  findAndReplaceLinks(scheme);
}


// Sets new sources for images if color scheme's change is occured
function setColorSchemeImages(colorSet) {

  if (colorSet) {
    document.getElementsByClassName('header__logo')[0].src =
      document.getElementsByClassName('footer__logo')
        .src ='/static/images/logo.png';

      if (document.getElementsByClassName('content__painting')[0]) {
        document.getElementsByClassName('content__painting')[0]
          .src = '/static/images/blog/background.png'
      }
  } else {
    document.getElementsByClassName('header__logo')[0].src =
      document.getElementsByClassName('footer__logo')
        .src = '/static/images/article/logo.png';

      if (document.getElementsByClassName('content__painting')[0]) {
        document.getElementsByClassName('content__painting')[0]
          .src = '/static/images/blog/background1.png'
      }
  }
}


// Disclaimer & d_opener toggle
function toggleDisclaimer() {
  document.getElementsByClassName('content__disclaimer')[0].
  classList.toggle('open');
  document.getElementsByClassName('d__opener')[0]
    .classList.toggle('open');
}


// -- smooth opacity edition --
function toggleDisclaimerConstructor() {
  let help = document.getElementsByClassName('constructor__disclaimer')[0];
  let opener = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    if (help.classList.contains('open')) {
      opener.style.opacity = '0';
      opener.classList.toggle('open');
      setTimeout(function() {
        opener.style.opacity = '1';
      }, 50);

      help.style.opacity = '0';
      setTimeout(function() {
        help.classList.toggle('open');
        help.style.opacity = '1';
      }, 500)
    } else {
      opener.style.opacity = '0';
      setTimeout(function() {
        opener.classList.toggle('open');
        opener.style.opacity = '1';
      }, 500);

      help.style.opacity = '0';
      help.classList.toggle('open');
      setTimeout(function() {
        help.style.opacity = '1';
      }, 50);
    }
}


// Info opener --smoth opacity edition--
function toggleInfo(who) {
  let info = document.querySelector(who);
    if (info.classList.contains('open')) {
      info.style.opacity = '0';
      setTimeout(function() {
        info.classList.toggle('open');
        info.style.opacity = '1';
      }, 500)
    } else {
      info.style.opacity = '0';
      info.classList.toggle('open');
      setTimeout(function() {
        info.style.opacity = '1';
      }, 50)
    }
}


// Menu opener
function toggleMenu() {
  document.getElementsByClassName('header__menu_icon')[0].classList.toggle('open_menu');
  let menu = document.getElementsByClassName('header__menu')[0];
    menu.classList.toggle('open');
    return false;
}


// Logout link
function userLogOut() {
  document.location.href = "/blog/?action=logout" + checkColorScheme();
}
