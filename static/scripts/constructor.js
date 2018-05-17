/* ADDITIONAL PAGE LOADER */
(function () {
  setLeftForHelpBotton();
  createElementsTree();
  textareaNListener();
  createThemeSelector();
  createThemeSelectorListener();
  setListenerToFontPicker();
  addDisclaimerListenersEditorMainBlock();
  schemeFixer();
  listenerForThemeSelector();

  window.addEventListener('resize', setLeftForHelpBotton, false);
  document.body.addEventListener('click', listenerBodyConstructor);
})();


function setThemeOnLoad(theme) {
  document.getElementById('settings__theme_selector').textContent = theme;
}


function listenerForThemeSelector() {
  let label = document.querySelector('label[for="settings__theme_container"]');
    label.onmouseenter = label.onmouseleave = function() {
      document.getElementById('settings__theme_selector')
        .classList.toggle('hovered_scheme');
    }
}


function schemeFixer() {
  if (document.body.classList.contains('red_scheme_body')) {
    document.getElementById('scheme_fixer').value = 'night';
  }
}


function addDisclaimerListenersEditorMainBlock() {
  document.querySelector('.constructor__button.info-elem').onclick =
    document.getElementsByClassName('editor_main_block_disclaimer_closer')[0]
    .onclick = function() {
      toggleDisclaimerEditorMainBlock('editor_main_block_disclaimer');
    };

  document.getElementById('picker_m_img2').onclick =
    document.getElementById('picker_m_img2_closer').onclick = function() {
      toggleDisclaimerEditorMainBlock('picker_m_img2_disclaimer');
    };

  document.getElementById('picker_m_gs1').addEventListener('change', function() {
    let select = document.getElementById('picker_m_gs2').children;
    if (event.target.value === 'linear-gradient') {
      select[0].value = 'to top';
      select[1].value = 'to right';
      select[2].value = 'to right top';
      select[3].value = 'to right bottom';
    } else {
      select[0].value = 'at top';
      select[1].value = 'at center';
      select[2].value = 'at top right';
      select[3].value = 'at bottom left';
    }
  })
}


function toggleDisclaimerEditorMainBlock(class_name) {
  let dev = document.getElementsByClassName(class_name)[0];
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


/* FUNCTIONS */
// Article form filling
function acceptChangesToArticle() {

    document.getElementById('id_author').value =
      document.querySelector('.blog__author b').textContent.trim();

    let contentFull = getContent();
      document.getElementById('id_content').value = contentFull[0];
      document.getElementById('id_content_add').value = contentFull[1];

    document.getElementById('id_name').value =
      document.querySelector('#newarticle legend').textContent.trim();

    document.getElementById('id_theme').value =
      getTheme().toString();

}


function getTheme() {
  let mass = ['Учёба', 'Компьютер', 'Разное'];
  let index = document.getElementById('settings__theme_selector').textContent;

  return mass.indexOf(index) + 1;
}


// Form posting trigger
function confirmPublication(name=false) {
  if (name) acceptChangesToArticle();

  document.getElementsByClassName('article__form_div')[0]
    .classList.toggle('open');
}


// Creates the Element Tree
function createElementsTree() {
  let tree = document.getElementById('elem__tree');
  let editor = document.getElementById('editor_content');
  let editor_pre = document.getElementById('editor_pre');
  let content = document.getElementById('newcontent').children;
  let label = document.getElementById('editor_content_label');
  let label_block = document.getElementById('editor_block_label');
  let settingsLabel = document.getElementById('drag_elem_name');


  let tagMas = ['P', 'H2', 'UL', 'TABLE', 'CODE', 'IMG'];

    for (let i = 0; i < content.length; i++) {
      if (content[i].tagName !== 'DIV') continue;

      let li = document.createElement('li');
      let innerContent = content[i].children;

        if (content[i].dataset.namediv) {
          li.innerText = content[i].dataset.namediv;
        } else {
          li.innerText = content[i].dataset.namediv = 'Блок №' + i;
        }

        li.onclick = function() {
          listenerBlock(content[i]);
        };

        if (innerContent.length) {
          let ul = document.createElement('ul');

            for (let j = 0; j < innerContent.length; j++) {
              if (!~tagMas.indexOf(innerContent[j].tagName)) continue;
              let innerLi = document.createElement('li');

                if (innerContent[j].dataset.nameelem) {
                  innerLi.innerText = innerContent[j].dataset.nameelem;
                } else {
                  innerLi.innerText = innerContent[j].dataset.nameelem =
                    'Элемент №' + j;
                }

                innerLi.onclick = function() {
                  listenerElement(innerContent[j], content[i]);
                };

              ul.appendChild(innerLi);
            }
          li.appendChild(ul);
        }
      tree.appendChild(li);
    }

  function listenerBlock(block) {
    label_block.textContent = settingsLabel.textContent = block.dataset.namediv;
    openEditor('.editor_block');
    hideMainHelpButton();
    setListenerToDeclineButtonBlock();
    setListenerToSaveButtonBlock();
  }

  function listenerElement(elem, parent) {
    editor.value = elem.textContent.replace(/\n/g, '⤓\n');
    editor_pre.innerHTML = elem.outerHTML + '';
    label.textContent = settingsLabel.textContent = elem.tagName;
    openEditor('.editor_element');
    setListenerToDeclineButton(editor, elem, settingsLabel);
    setListenerToSaveButton(editor, elem, settingsLabel);
  }
}


function hideMainHelpButton() {
  document.getElementsByClassName('constructor__disclaimer_opener')[0]
    .classList.remove('open');
}


function showMainHelpButton() {
  document.getElementsByClassName('constructor__disclaimer_opener')[0]
    .classList.add('open');
}


// Constructor version
function createOption(index) {
  let options = ['all', 'Все', 'Учёба', 'Компьютер', 'Разное'];
  let option = document.createElement('div');
  let select = document.getElementById('settings__theme_selector');
    option.innerHTML = options[index];
    option.addEventListener('click', function() {
      select.textContent = option.innerHTML;
      select.classList.remove('select-arrow-active');
    });

  return option;
}


// Theme selector - settings
function createThemeSelector() {
  let theme_select = document.getElementById('settings__theme_container');
    theme_select.appendChild(createSelectHead('settings__theme_selector', 'Разное'));
    theme_select.appendChild(createSelectOptions(2));
}


// Opener for theme selector
function createThemeSelectorListener() {
  document.getElementById('settings__theme_selector')
    .addEventListener('click', function() {
      this.nextElementSibling.classList.toggle('open');
    })
}


// Cancel element changes
function declineChanges() {
  if (document.querySelector('.editor_element.open')) {
    smoothOpacity('.editor_element', findBlockOrMain(), '.warning_div.declined');
    document.getElementById('editor_content').value = '';
    resetElemSettings();
  } else {
    smoothOpacity('.editor_block', '.editor_block_main', '.warning_div.declined');
    resetElemSettings();
  }
}


// Fill the content and content_add fields
function getContent(flag=false) {
  let content = document.getElementById('newcontent').children;
  let [base, additional] = ['', ''];
  let height = 0;
    for (let i = 0; i < content.length; i++) {
      if (height < 250) {
        base += content[i].outerHTML;
        height += content[i].getBoundingClientRect().height;
        continue;
      }

      height += content[i].getBoundingClientRect().height;
        if (height < 350) base += content[i].outerHTML;
        else additional += content[i].outerHTML;
    }

    if (flag) {
      if (height > 100) {
        document.getElementsByClassName('publish__button')[0]
          .removeAttribute('disabled');
        document.querySelector('.constructor__button.publish')
          .removeAttribute('disabled');
      } else {
        document.getElementsByClassName('publish__button')[0]
          .setAttribute('disabled', true);
        document.querySelector('.constructor__button.publish')
          .setAttribute('disabled', true);
      }
    }

  return [base.replace(/\n/g, '⤓'), additional.replace(/\n/g, '⤓')];
}


// Listener for custom selects
function listenerBodyConstructor(e) {
    if ( document.getElementsByClassName('select-items')[0] &&
              !(e.target.classList.contains('settings__theme_selector'))) {
      document.getElementsByClassName('select-items')[0]
                                       .classList.remove('open');
    }
}


// Smooth changes of editor panel
function openEditor(query) {
  if (document.querySelector('.editor_block.open')) {
    smoothOpacity('.editor_block', query);
  } else if (document.querySelector('.editor_block_main.open')) {
    smoothOpacity('.editor_block_main', query);
  } else {
    smoothOpacity('.editor_element', query);
  }
}


// Prevents default actions for textarea
function preventNewLine() {
  if (event.keyCode === 13 || event.keyCode === 9) {
    event.preventDefault();
    return false;
  }
}


// Save settings to element & smooth transition
function saveChanges(flag=false) {
  if (flag) {
    saveContentBoxSettings();
    showMainHelpButton()
    smoothOpacity('.editor_block_main', '.editor_block_main', '.warning_div.saved');
    return;
  }

  if (document.querySelector('.editor_element.open')) {
    saveElemSettings(true);
    smoothOpacity('.editor_element', findBlockOrMain(), '.warning_div.saved');
    showMainHelpButton()
  } else {
    saveElemSettings(true);
    smoothOpacity('.editor_block', '.editor_block_main', '.warning_div.saved');
    showMainHelpButton()
  }
}


function saveContentBoxSettings() {
  document.getElementById('bcs_ta').textContent =
    document.getElementById('bcs_ta_s').value;
  document.getElementById('bcs_c').textContent =
    document.getElementById('bcs_c_s').value;
  document.getElementById('bcs_pd').textContent =
    document.getElementById('bcs_pd_s').value;
  document.getElementById('bcs_ff').textContent =
    document.getElementById('bcs_ff_s').value;

  document.querySelector('#newarticle legend').textContent =
    document.getElementById('settings__name_input').value;

  addContentBoxStyle('newcontent');
  getContent(true);
}


function setMainStylesIfEddited() {
  let align = document.getElementById('bcs_ta');
  let color = document.getElementById('bcs_c');
  let padin = document.getElementById('bcs_pd');
  let fontf = document.getElementById('bcs_ff');

  if (align && align.textContent) {
    document.getElementById('bcs_ta_s').value = align.textContent;
  }
  if (color && color.textContent) {
    document.getElementById('bcs_c_s').value = color.textContent;
  }
  if (padin && padin.textContent) {
    document.getElementById('bcs_pd_s').value = padin.textContent;
  }
  if (fontf && fontf.textContent) {
    document.getElementById('bcs_ff_s').value =
    document.getElementById('bcs_ff_s').style.fontFamily = fontf.textContent;
  }
}


// Sets the help button position
function setLeftForHelpBotton() {
  let help = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    help.style.left = (document.documentElement.offsetWidth -
      help.getBoundingClientRect().width) / 2 + 'px';
}


// Saves changes to elements & checks publishion availability
function setListenerToSaveButton(editor, elem) {
  let button = document.querySelector('.editor_element .accept-elem');
    button.addEventListener('click', saveListener);

  function saveListener() {
    elem.textContent = editor.value.replace(/⤓\n/g, '\n');
    editor.value = '';
    getContent(true);
    button.removeEventListener('click', saveListener);
  }
}


// Dynamic preview listener for textarea
function showPreview(flag=false) {
  let pre = document.getElementById('editor_pre');
  if (pre.children[0]) {
    pre.children[0].innerHTML = (event.target.value + '').replace(/⤓\n/g, '\n');
  } else {
    pre.innerHTML = (event.target.value + '').replace(/⤓\n/g, '\n');
  }
}


// Smooth opacity transition realization
function smoothOpacity(elem, next, optional=false) {
  let close = document.querySelector(elem);
  let open = document.querySelector(next);
  if (optional) {
    let div = document.querySelector(optional);
    toggleOpenAndOpacity(div, div);
    setTimeout(function () { div.style.opacity = '0'; }, 250);
  }

  toggleOpenAndOpacity(open, close);

  function toggleOpenAndOpacity(first, second) {
    first.style.opacity = '0';
    first.classList.toggle('open');
    setTimeout(function () { first.style.opacity = '1'; }, 50);

    second.style.opacity = '0';
    setTimeout(function () {
      second.classList.toggle('open');
      second.style.opacity = '1';
    }, 500);
  }
}


// Textarea new line listener - \n realization
function textareaNListener() {
  let area = document.getElementById('editor_content');
    area.addEventListener('keydown', function() {
      if (event.keyCode === 13) {
        listenerEnterAndTabs('⤓\n');
      } else if (event.keyCode === 9) {
        listenerEnterAndTabs('\t');
      }
    });

  function listenerEnterAndTabs(tag) {
    let value = event.target.value;
    let selection = event.target.selectionStart;
      event.target.value = value.slice(0, selection) + tag +
        value.slice(event.target.selectionEnd);

      area.selectionStart = selection + tag.length;
      area.selectionEnd = selection + tag.length;
  }
}


function setListenerToFontPicker() {
  let select = document.getElementById('bcs_ff_s');
    select.onchange = function() {
      this.style.fontFamily = select.value;
    }
}


function showBackgroundPicker() {
  document.getElementsByClassName('background_picker_m')[0]
    .classList.toggle('open');
    if (event.target.innerHTML === 'Изменить') {
      event.target.innerHTML = 'Скрыть';
    } else {
      event.target.innerHTML = 'Изменить';
    }
}


function checkBackgroundPickerOptions() {
  if (event.target.value === '1') {
    document.getElementById('picker_m_c').classList.remove('open');
    document.getElementById('picker_m_g1').classList.remove('open');
    document.getElementById('picker_m_g2').classList.remove('open');
    document.getElementById('picker_m_gs1').classList.remove('open');
    document.getElementById('picker_m_gs2').classList.remove('open');
    document.getElementById('picker_m_img').classList.remove('open');
    document.getElementById('picker_m_img1').classList.remove('open');
    document.getElementById('picker_m_img2').classList.remove('open');
    document.getElementById('picker_m_img3').classList.remove('open');
  } else if (event.target.value === '2') {
    document.getElementById('picker_m_c').classList.add('open');
    document.getElementById('picker_m_g1').classList.remove('open');
    document.getElementById('picker_m_g2').classList.remove('open');
    document.getElementById('picker_m_gs1').classList.remove('open');
    document.getElementById('picker_m_gs2').classList.remove('open');
    document.getElementById('picker_m_img').classList.remove('open');
    document.getElementById('picker_m_img1').classList.remove('open');
    document.getElementById('picker_m_img2').classList.remove('open');
    document.getElementById('picker_m_img3').classList.remove('open');
  } else if (event.target.value === '3') {
    document.getElementById('picker_m_c').classList.remove('open');
    document.getElementById('picker_m_g1').classList.add('open');
    document.getElementById('picker_m_g2').classList.add('open');
    document.getElementById('picker_m_gs1').classList.add('open');
    document.getElementById('picker_m_gs2').classList.add('open');
    document.getElementById('picker_m_img').classList.remove('open');
    document.getElementById('picker_m_img1').classList.remove('open');
    document.getElementById('picker_m_img2').classList.remove('open');
    document.getElementById('picker_m_img3').classList.remove('open');
  } else {
    document.getElementById('picker_m_c').classList.remove('open');
    document.getElementById('picker_m_g1').classList.remove('open');
    document.getElementById('picker_m_g2').classList.remove('open');
    document.getElementById('picker_m_gs1').classList.remove('open');
    document.getElementById('picker_m_gs2').classList.remove('open');
    document.getElementById('picker_m_img').classList.add('open');
    document.getElementById('picker_m_img1').classList.add('open');
    document.getElementById('picker_m_img2').classList.add('open');
    document.getElementById('picker_m_img3').classList.add('open');
  }
}


function submitBackgroundChangesMain() {
  let value = document.getElementById('bcs_bg_s').value;
  let background = document.getElementById('bcs_bg');
    if (value === '1') {
      background.textContent = 'transparent';
    } else if (value === '2') {
      background.textContent = document.getElementById('picker_m_c').value;
    } else if (value === '3') {
      background.textContent = document.getElementById('picker_m_gs1').value +
        '(' + document.getElementById('picker_m_gs2').value + ',' +
        document.getElementById('picker_m_g1').value + ',' +
        document.getElementById('picker_m_g2').value + ')'
    } else if (value === '4') {
      let link = document.getElementById('picker_m_img').value;

      let url = 'url(';
      if (document.querySelector('#picker_m_img3 input').checked) url = 'fixed url(';

      if (~link.indexOf('[img]')) {
        background.textContent = url + link.slice(link.indexOf('[img]') +
          5, link.indexOf('[/img]')) + ') no-repeat'
      } else if (~link.indexOf('src="')) {
        link = link.slice(link.indexOf('src="') + 5);
        background.textContent = url + link.slice(0, link.indexOf('"')) +
          ') no-repeat'
      } else {
        background.textContent = url + link + ') no-repeat'
      }
    }

  addContentBoxStyle('newcontent');
  getContent(true);
}



// ON PROGRESS


// -- on progress -- Search for parent block
function findBlockOrMain() {
  return '.editor_block';
}
function saveElemSettings(flag=false) {
  if (flag) {
    resetElemSettings();
  } else {
    document.querySelector('#newarticle legend').textContent =
      document.getElementById('settings__name_input').value;
  }
}

function showHelpEditorMain() {
  document.getElementsByClassName('editor_main_block_disclaimer')[0]
    .classList.toggle('open');
}


function resetElemSettings() {}
function setListenerToDeclineButton() {}
function createSettingsForElement(elem) {}
function createNewBlock() {}
function setListenerToDeclineButtonBlock() {}
function setListenerToSaveButtonBlock() {}
