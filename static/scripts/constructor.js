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


// Adds listeners to main settings elements
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

  ['m', 'bs', 'es'].forEach(listenerForGradient);

  function listenerForGradient(elem) {
    document.getElementById('picker_' + elem + '_gs1').addEventListener('change', function () {
      let select = document.getElementById('picker_' + elem + '_gs2').children;
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
    });
  }
}


// Globaly changes block name
function changeBlockName(block, li, input, label) {
  label.textContent = document.getElementById('drag_elem_name').textContent =
    block.dataset.namediv = li.children[0].textContent = input.value;
}


// Globaly changes element name
function changeElementName(elem, li, input, label) {
  label.textContent = document.getElementById('drag_elem_name').textContent =
    elem.dataset.nameelem = li.children[0].textContent = input.value;
}


// Background picker variants changer
function checkBackgroundPickerOptions(block='m') {
  if (event.target.value === '1') {
    document.getElementById('picker_'+block+'_c').classList.remove('open');
    document.getElementById('picker_'+block+'_g1').classList.remove('open');
    document.getElementById('picker_'+block+'_g2').classList.remove('open');
    document.getElementById('picker_'+block+'_gs1').classList.remove('open');
    document.getElementById('picker_'+block+'_gs2').classList.remove('open');
    document.getElementById('picker_'+block+'_img').classList.remove('open');
    document.getElementById('picker_'+block+'_img1').classList.remove('open');
    document.getElementById('picker_'+block+'_img2').classList.remove('open');
    document.getElementById('picker_'+block+'_img3').classList.remove('open');
    document.getElementById('picker_'+block+'_opa').classList.remove('open');
  } else if (event.target.value === '2') {
    document.getElementById('picker_'+block+'_c').classList.add('open');
    document.getElementById('picker_'+block+'_g1').classList.remove('open');
    document.getElementById('picker_'+block+'_g2').classList.remove('open');
    document.getElementById('picker_'+block+'_gs1').classList.remove('open');
    document.getElementById('picker_'+block+'_gs2').classList.remove('open');
    document.getElementById('picker_'+block+'_img').classList.remove('open');
    document.getElementById('picker_'+block+'_img1').classList.remove('open');
    document.getElementById('picker_'+block+'_img2').classList.remove('open');
    document.getElementById('picker_'+block+'_img3').classList.remove('open');
    document.getElementById('picker_'+block+'_opa').classList.add('open');
  } else if (event.target.value === '3') {
    document.getElementById('picker_'+block+'_c').classList.remove('open');
    document.getElementById('picker_'+block+'_g1').classList.add('open');
    document.getElementById('picker_'+block+'_g2').classList.add('open');
    document.getElementById('picker_'+block+'_gs1').classList.add('open');
    document.getElementById('picker_'+block+'_gs2').classList.add('open');
    document.getElementById('picker_'+block+'_img').classList.remove('open');
    document.getElementById('picker_'+block+'_img1').classList.remove('open');
    document.getElementById('picker_'+block+'_img2').classList.remove('open');
    document.getElementById('picker_'+block+'_img3').classList.remove('open');
    document.getElementById('picker_'+block+'_opa').classList.add('open');
  } else {
    document.getElementById('picker_'+block+'_c').classList.remove('open');
    document.getElementById('picker_'+block+'_g1').classList.remove('open');
    document.getElementById('picker_'+block+'_g2').classList.remove('open');
    document.getElementById('picker_'+block+'_gs1').classList.remove('open');
    document.getElementById('picker_'+block+'_gs2').classList.remove('open');
    document.getElementById('picker_'+block+'_img').classList.add('open');
    document.getElementById('picker_'+block+'_img1').classList.add('open');
    document.getElementById('picker_'+block+'_img2').classList.add('open');
    document.getElementById('picker_'+block+'_img3').classList.add('open');
    document.getElementById('picker_'+block+'_opa').classList.remove('open');
  }
}


// Cleaned up passe block's mini tree
function cleanMiniTree() {
  document.getElementById('block__list').innerHTML = '';
  document.querySelector('#block__map .map_inner').innerHTML = '';
}


// Create-element-div closer
function closeCreateElemDiv() {
  document.getElementById('create_element_div').classList.remove('open');
}


// Form posting trigger
function confirmPublication(name=false) {
  if (name) acceptChangesToArticle();
  document.getElementsByClassName('article__form_div')[0]
    .classList.toggle('open');
}


// Block create element buttons listener
function createButtonsListeners(block, i) {
  let tree = document.getElementById('elem__tree');

  document.getElementById('create_text_elem').onclick =
    function() { onclickElem('p'); };
  document.getElementById('create_head_text_elem').onclick =
    function() { onclickElem('h2'); };
  document.getElementById('create_code_elem').onclick =
    function() { onclickElem('code'); };
  document.getElementById('create_img_elem').onclick =
    function() { onclickElem('img'); };

  function onclickElem(elem) {
    block.appendChild(createNewElem(elem));
    tree.innerHTML = '';
    createElementsTree();
    showCreateElemDiv();
    tree.children[i-1].children[1].lastChild.children[0].click();
  }
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
        li.appendChild(document.createElement('span'));
        li.children[0].style.fontWeight = 'bold';
        li.children[0].style.fontFamily = 'monospace';
        li.children[0].style.fontStyle = 'normal';
        li.children[0].style.fontSize = '200%';
        li.children[0].style.color = 'gainsboro';

        if (content[i].dataset.namediv) {
          li.children[0].innerText = content[i].dataset.namediv;
        } else {
          li.children[0].innerText = content[i].dataset.namediv = 'Блок №' + i;
        }

        li.children[0].onclick = function() {
          listenerBlock(content[i], li, i);
        };

        let ul = document.createElement('ul');
        if (innerContent.length) {

            for (let j = 0; j < innerContent.length; j++) {
              if (!~tagMas.indexOf(innerContent[j].tagName)) continue;
              let innerLi = document.createElement('li');

                innerLi.appendChild(document.createElement('span'));
                innerLi.className = 'dragble_li';
                if (innerContent[j].dataset.nameelem) {
                  innerLi.children[0].innerText =
                    innerContent[j].dataset.nameelem;
                } else {
                  innerLi.children[0].innerText =
                    innerContent[j].dataset.nameelem = 'Элемент №' + j;
                }

                innerLi.children[0].onclick = function() {
                  listenerElement(innerContent[j], innerLi, i);
                };

              ul.appendChild(innerLi);
            }
        }
        li.appendChild(ul);

      tree.appendChild(li);
    }

  function listenerBlock(block, li, i) {
    label_block.textContent = settingsLabel.textContent = block.dataset.namediv;
    openEditor('.editor_block');
    hideMainHelpButton();
    setListenerToButtonsBlock(block, li, i);
    setListenerToNameChanger(block, li);
    setListenerToBlockDeletion(block, li);
    cleanMiniTree();
    createMiniTree(block, i);
    setMainStylesIfEddited();
    closeCreateElemDiv();
    setListenersToMoveUpDownButtons(block, i);
    reservedCopyOfBlockSettings(block);
    saveBlockBackgroundChangesListener(block);
    setListenerBlockImgHelp();
    notShowElementSettings();
    resetBlockSettings(block);
    showBlockSettings(block);
    developerDecoding(block, block.dataset.developer);
    setWebDeveloperButton(block, 0);
  }

  function listenerElement(elem, innerLi, i) {
    if (elem.tagName !== 'IMG') editor.value = elem.textContent;
    else loadImageForImg(elem, editor_pre);
    editor_pre.innerHTML = elem.outerHTML + '';
    label.textContent = settingsLabel.textContent = elem.dataset.nameelem;
    openEditor('.editor_element');
    hideMainHelpButton();
    setListenerToElementDeletion(elem, i);
    setListenerToButtonsElement(elem, i);
    reservedCopyOfElementSettings(elem, editor, editor_pre);
    setListenerToNameChangerElement(elem, innerLi);
    resetElemSetting(elem);
    setMainStylesIfEddited();
    notShowBlockSettings();
    closeCreateElemDiv();
    setListenerElementImgHelp();
    showElementSettings(elem);
    saveElemBackgroundChangesListener(elem, editor_pre);
    setStyleOfEditor(elem.tagName);
    if (elem.tagName === 'IMG') getRidOfExtraSettingsForImage();
    else showAllFields();
    setWebDeveloperButton(elem, 1);
    developerDecoding(elem, elem.dataset.developer);
    event.stopPropagation()
  }
}


// Creates Block's visual Tree of elements
function createMiniTree(block, i) {
  let container = document.getElementById('block__list');
  let display = document.querySelector('#block__map .map_inner');
  let children = block.children;
  let overall = block.getBoundingClientRect();
  let height = overall.height === 0 ? children.length-1 : overall.height;
  let width = overall.width === 0 ? 1 : overall.width;

    if (children.length) {
      let ul = document.createElement('ul');
      for (let i = 0; i < children.length; i++) {
        let li = document.createElement('li');
        let div = document.createElement('div');
          div.style.display = 'inline-block';
          // ['P', 'H2', 'UL', 'TABLE', 'CODE', 'IMG'];
          if (children[i].tagName === 'CODE') {
            div.style.background = 'rgba(128, 128, 128, .15)';
            div.style.border = '2px solid rgba(128, 128, 128, .4)';
          } else if (children[i].tagName === 'P') {
            div.style.background = 'rgba(0, 0, 128, .15)';
            div.style.border = '2px solid rgba(0, 0, 128, .4)';
          } else if (children[i].tagName === 'H2') {
            div.style.background = 'rgba(128, 128, 0, .15)';
            div.style.border = '2px solid rgba(128, 128, 0, .4)';
          } else if (children[i].tagName === 'UL') {
            div.style.background = 'rgba(0, 128, 0, .15)';
            div.style.border = '2px solid rgba(0, 128, 0, .4)';
          } else if (children[i].tagName === 'TABLE') {
            div.style.background = 'rgba(255, 128, 128, .15)';
            div.style.border = '2px solid rgba(255, 128, 255, .4)';
          } else if (children[i].tagName === 'IMG') {
            div.style.background = 'rgba(255, 0, 0, .15)';
            div.style.border = '2px solid rgba(255, 0, 0, .4)';
          }

          let style = children[i].getBoundingClientRect();
          let heightMe = style.height === 0 ? 1 : style.height;
          let widthMe = style.width === 0 ? 1 : style.width;
          div.style.height = parseInt(heightMe * 100 / height) + '%';
          div.style.width = parseInt(widthMe * 100 / width) + '%';
          display.appendChild(div);

          li.textContent = children[i].dataset.nameelem;
          li.addEventListener('mouseenter', function() {
            div.classList.add('fire_block');
          });

          li.addEventListener('mouseleave', function() {
            div.classList.remove('fire_block');
          });

          li.addEventListener('click', function() {
            createMoveButtonsToElem(children[i])
          });

          ul.appendChild(li);
      }
      container.appendChild(ul);
    }

  function createMoveButtonsToElem(elem) {
    let container = document.createElement('span');
      container.className = 'elem_move_container';
      container.style.left = (event.clientX - 20) + 'px';
      container.style.top = (event.clientY - 60) + 'px';
      container.addEventListener('mouseleave', function() {
        document.body.removeChild(container);
      });

    let buttonUp = document.createElement('button');
    let buttonDown = document.createElement('button');
      buttonUp.className = buttonDown.className = 'elem_move_button';
      buttonUp.textContent = '🡡';
      buttonDown.textContent = '🡣';

      buttonUp.onclick = function() {
        if (elem.previousElementSibling) {
          elem.parentNode.insertBefore(elem, elem.previousElementSibling);
          let tree = document.getElementById('elem__tree');
          tree.innerHTML = '';
          createElementsTree();
          tree.children[i-1].children[0].click();
        }
      };

      buttonDown.onclick = function() {
        if (elem.nextElementSibling) {
          elem.parentNode.insertBefore(elem.nextElementSibling, elem);
          let tree = document.getElementById('elem__tree');
          tree.innerHTML = '';
          createElementsTree();
          tree.children[i-1].children[0].click();
        }
      };

    container.appendChild(buttonUp);
    container.appendChild(buttonDown);
    document.body.appendChild(container);
  }
}


// Creates new default block
function createNewBlock() {
  let newBlock = document.createElement('div');
  let tree = document.getElementById('elem__tree');
    newBlock.dataset.namediv = 'Новый блок';
    newBlock.dataset.developer = '';

    newBlock.style.display = 'block';
    newBlock.style.position = 'relative';
    newBlock.style.margin = '0';
    newBlock.style.padding = '0';
    newBlock.style.boxShadow = 'none';
    newBlock.style.border = 'none';
    newBlock.style.background = 'transparent';
    newBlock.style.textAlign = 'inherit';
    newBlock.style.color = 'inherit';

  document.getElementById('newcontent').appendChild(newBlock);
  tree.innerHTML = '';
  createElementsTree();
  tree.lastChild.children[0].click();
}


// Creates new element
function createNewElem(elem) {
  let newElem = document.createElement(elem);
  let current_name = 'Новый текст';
    if (elem === 'h2') current_name = 'Новый заголовок';
    else if (elem === 'code') current_name = 'Новый особый текст';
    else if (elem === 'img') current_name = 'Новое изображение';

    newElem.dataset.nameelem = current_name;
    newElem.dataset.developer = '';

    newElem.style.margin = '0';
    newElem.style.padding = '0';
    newElem.style.boxShadow = '';
    newElem.style.border = '';
    newElem.style.background = 'transparent';
    if (elem.tagName === 'IMG') newElem.style.float = '';
    else  newElem.style.textAlign = '';
    newElem.style.color = '';
    newElem.style.width = '';
    newElem.style.fontFamily = '';
    newElem.style.fontWeight = '';
    newElem.style.fontStyle = '';
    newElem.style.fontSize = '';
    newElem.style.textShadow = '';
    newElem.style.textDecoration = '';

  return newElem;
}


// Constructor version of options
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


// Fill the content and content_add fields, checks publish availability
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

  return [base.replace(/⤓/g, '⬇').replace(/\n/g, '⤓'),
          additional.replace(/⤓/g, '⬇').replace(/\n/g, '⤓')];
}


// Sets theme selection value
function getTheme() {
  let mass = ['Учёба', 'Компьютер', 'Разное'];
  let index = document.getElementById('settings__theme_selector').textContent;

  return mass.indexOf(index) + 1;
}


// Return to main settings
function getToMainSettings() {
  if (document.querySelector('.editor_element.open')) {
    document.getElementById('drag_elem_name').textContent = 'Свойства статьи';
    smoothOpacity('.editor_element', '.editor_block_main');
    showMainHelpButton();
  } else if (document.querySelector('.editor_block.open')) {
    document.getElementById('drag_elem_name').textContent = 'Свойства статьи';
    smoothOpacity('.editor_block', '.editor_block_main');
    showMainHelpButton();
  } else {
    setMainStylesIfEddited();
  }
}


// Upwards bottom listener block
function getUpwardsBlock() {
  document.getElementById('drag_elem_name').textContent = 'Свойства статьи';
  smoothOpacity('.editor_block', '.editor_block_main');
  document.querySelector('.draggable_properties.block_single').classList.remove('open');
  showMainHelpButton();
  notShowBlockSettings();
}


// Upwards bottom listener element
function getUpwardsElement(elem, i) {
  document.getElementById('drag_elem_name').textContent = elem.parentNode.dataset.namediv;
  notShowElementSettings();
  document.getElementById('elem__tree').children[i-1].children[0].click();
}


// HEX-to-RGB converter
function hexToRgb(hex, opacity=1) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) +
      ',' + parseInt(result[3], 16) + ',' + opacity + ')' : null;
}


// Hides main settings & main help button
function hideMainHelpButton() {
  let closer = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    closer.style.opacity = '0';
    setTimeout(function () {
      closer.classList.remove('open');
      document.querySelector('.draggable_properties.block_main')
        .classList.remove('open');
    }, 500);
}


// Listener for custom selects
function listenerBodyConstructor(e) {
    if ( document.getElementsByClassName('select-items')[0] &&
              !(e.target.classList.contains('settings__theme_selector'))) {
      document.getElementsByClassName('select-items')[0]
                                       .classList.remove('open');
    }
}


// Visual effect connecting label with custom selector
function listenerForThemeSelector() {
  let label = document.querySelector('label[for="settings__theme_container"]');
    label.onmouseenter = label.onmouseleave = function() {
      document.getElementById('settings__theme_selector')
        .classList.toggle('hovered_scheme');
    }
}


// Removes viibility of block settings
function notShowBlockSettings() {
  document.querySelector('.draggable_properties.block_single').classList.remove('open');
}


// Removes viibility of element settings
function notShowElementSettings() {
  document.querySelector('.draggable_properties.elem_single').classList.remove('open');
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
  if (event.keyCode === 9) {
    event.preventDefault();
    return false;
  }
}


// Buffer settings for save/cancel buttoms actions, element
function reservedCopyOfBlockSettings(block) {
  let margin = block.style.margin;
  let padding = block.style.padding;
  let textAlign = block.style.textAlign;
  let color = block.style.color;
  let fontFamily = block.style.fontFamily;
  let borderRadius = block.style.borderRadius;
  let border = block.style.border;
  let background = block.style.background;

  document.querySelector('.editor_block .accept-elem').onclick = function () {
    saveBlockSettings(block);
    smoothOpacity('.editor_block', '.editor_block', '.warning_div.saved');
  };

  document.querySelector('.editor_block .decline-elem').onclick = function () {
    restoreDefault();
    smoothOpacity('.editor_block', '.editor_block', '.warning_div.declined');
  };

  function restoreDefault() {
    block.style.margin = margin;
    block.style.padding = padding;
    block.style.textAlign = textAlign;
    block.style.color = color;
    block.style.fontFamily = fontFamily;
    block.style.borderRadius = borderRadius;
    block.style.border = border;
    block.style.background = background;
  }
}


// Buffer settings for save/cancel buttoms actions, element
function reservedCopyOfElementSettings(elem, editor) {
  let margin = elem.style.margin;
  let padding = elem.style.padding;
  let textAlign
    if (elem.tagName === 'IMG') textAlign = elem.style.float;
    else textAlign = elem.style.textAlign;
  let color = elem.style.color;
  let fontFamily = elem.style.fontFamily;
  let borderRadius = elem.style.borderRadius;
  let border = elem.style.border;
  let background = elem.style.background;
  let width = elem.style.width;
  let boxShadow = elem.style.boxShadow;
  let fontWeight = elem.style.fontWeight;
  let fontStyle = elem.style.fontStyle;
  let textDecoration = elem.style.textDecoration;
  let fontSize = elem.style.fontSize;
  let textShadow = elem.style.textShadow;

  document.querySelector('.editor_element .accept-elem').onclick = function () {
    if (elem.tagName !== 'IMG') {
      elem.textContent = editor.value;
    }
    saveElemSettings(elem);
    editor_pre.innerHTML = elem.outerHTML + '';
    smoothOpacity('.editor_element', '.editor_element', '.warning_div.saved');
    getContent(true);
  };

  document.querySelector('.editor_element .decline-elem').onclick = function () {
    restoreDefault();
    smoothOpacity('.editor_element', '.editor_element', '.warning_div.declined');
  };

  function restoreDefault() {
    elem.style.margin = margin;
    elem.style.padding = padding;
    if (elem.tagName === 'IMG') elem.style.float = textAlign;
    else elem.style.textAlign = textAlign;
    elem.style.color = color;
    elem.style.fontFamily = fontFamily;
    elem.style.borderRadius = borderRadius;
    elem.style.border = border;
    elem.style.background = background;
    elem.style.width = width;
    elem.style.boxShadow = boxShadow;
    elem.style.fontWeight = fontWeight;
    elem.style.fontStyle = fontStyle;
    elem.style.textDecoration = textDecoration;
    elem.style.fontSize = fontSize;
    elem.style.textShadow = textShadow;
  }
}


// Analize current block, resets values in block settings
function resetBlockSettings(block) {
  let margin = block.style.margin === '0' ? 'default' : block.style.margin;
  setDefaultOrValue(document.getElementById('bs_mar'), margin);

  let padding = block.style.padding === '0' ? 'default' : block.style.padding;
  setDefaultOrValue(document.getElementById('bs_pd'), padding);

  let textAlign = block.style.textAlign === 'inherit' ? 'default' : block.style.textAlign;
  setDefaultOrValue(document.getElementById('bs_ta'), textAlign);

  let font = block.style.fontFamily === 'inherit' ? 'default' : block.style.fontFamily;
  setDefaultOrValue(document.getElementById('bs_ff'), font);

  let radius = block.style.borderRadius === '' ? '0px' : block.style.borderRadius;
  setDefaultOrValue(document.getElementById('bs_bor_r'), radius);

  let border = block.style.border.split(' ');
  if (border[0]) {
    setDefaultOrValue(document.getElementById('bs_bor'), border[0]);
  } else setDefaultOrValue(document.getElementById('bs_bor'), block.style.border);

  let value;
  let color;
  let index, rindex;

  value = document.getElementById('bs_bor_c');
  if (border[2]) {
    color = block.style.border;
    if (!~color.indexOf('#')) {
      index = color.indexOf('rgba(');
      rindex = color.indexOf('rgb(');
      if (~index) {
        color = color.slice(index + 5, color.lastIndexOf(','));
        color = color.split(',');
        value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
      } else if (~rindex) {
        color = color.slice(rindex + 4, color.indexOf(')'));
        color = color.split(',');
        value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
      } else value.value = '#011317';
    } else value.value = color;
  } else value.value = '#011317';


  value = document.getElementById('bs_c');
  color = block.style.color;
    if (!~color.indexOf('#')) {
      index = color.indexOf('rgba(');
      rindex = color.indexOf('rgb(');
      if (~index) {
        color = color.slice(index + 5, color.lastIndexOf(','));
        color = color.split(',');
        value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
      } else if (~rindex) {
        color = color.slice(rindex + 4, color.indexOf(')'));
        color = color.split(',');
        value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
      } else value.value = '#011317';
    } else value.value = color;
}


// Analize current element, resets values in element settings
function resetElemSetting(elem) {
  let margin = elem.style.margin === '0' ? 'default' : elem.style.margin;
  setDefaultOrValue(document.getElementById('es_mar'), margin);

  let padding = elem.style.padding === '0' ? 'default' : elem.style.padding;
  setDefaultOrValue(document.getElementById('es_pd'), padding);

  if (elem.tagName === 'IMG') {
    let textAlign = elem.style.textAlign === '' ? 'default' : elem.style.float;
    setDefaultOrValue(document.getElementById('es_ta'), textAlign);
  } else {
    let textAlign = elem.style.textAlign === 'inherit' ? 'default' : elem.style.textAlign;
    setDefaultOrValue(document.getElementById('es_ta'), textAlign);
  }

  let font = elem.style.fontFamily === 'inherit' ? 'default' : elem.style.fontFamily;
  setDefaultOrValue(document.getElementById('es_ff'), font);

  let radius = elem.style.borderRadius === '' ? '0px' : elem.style.borderRadius;
  setDefaultOrValue(document.getElementById('es_bor_r'), radius);

  let width = elem.style.width === '' ? 'default' : elem.style.width;
  setDefaultOrValue(document.getElementById('es_wid'), width);

  let fontWeight = elem.style.fontWeight === '' ? 'default' : elem.style.fontWeight;
  setDefaultOrValue(document.getElementById('es_fw'), fontWeight);

  let fontStyle = elem.style.fontStyle === '' ? 'default' : elem.style.fontStyle;
  setDefaultOrValue(document.getElementById('es_fst'), fontStyle);

  let textDecoration = elem.style.textDecoration === '' ? 'default' : elem.style.textDecoration;
  setDefaultOrValue(document.getElementById('es_fd'), textDecoration);

  let fontSize = elem.style.fontSize === '' ? 'default' : elem.style.fontSize;
  setDefaultOrValue(document.getElementById('es_fsz'), fontSize);

  resetColorElement(document.getElementById('es_c'), elem.style.color);

  let border = elem.style.border.split(' ');
  if (border[0]) setDefaultOrValue(document.getElementById('es_bor'), border[0]);
  else setDefaultOrValue(document.getElementById('es_bor'), elem.style.border);
  if (border[2]) resetColorElement(document.getElementById('es_bor_c'), elem.style.border);
  else document.getElementById('es_bor_c').value = '#011317';

  let boxShadow = elem.style.boxShadow;
  if (boxShadow && boxShadow.indexOf('#')) {
    setDefaultOrValue(document.getElementById('es_bsh'),
      boxShadow.slice(0, boxShadow.indexOf('#')).trim());}
  else if (boxShadow && boxShadow.indexOf('rgb')) {
    setDefaultOrValue(document.getElementById('es_bsh'),
      boxShadow.slice(0, boxShadow.indexOf('rgb')).trim());}
  else setDefaultOrValue(document.getElementById('es_bsh'), boxShadow);
  resetColorElement(document.getElementById('es_bsh_c'), boxShadow);

  let textShadow = elem.style.textShadow;
  if (textShadow && textShadow.indexOf('#')) {
    setDefaultOrValue(document.getElementById('es_fsh'),
      textShadow.slice(0, textShadow.indexOf('#')).trim());}
  else if (textShadow && textShadow.indexOf('rgb')) {
    setDefaultOrValue(document.getElementById('es_fsh'),
      textShadow.slice(0, textShadow.indexOf('rgb')).trim());}
  else setDefaultOrValue(document.getElementById('es_fsh'), textShadow);
  resetColorElement(document.getElementById('es_fsh_c'), textShadow);


  function resetColorElement(value, color) {
    if (color) {
      if (!~color.indexOf('#')) {
        let index = color.indexOf('rgba(');
        let rindex = color.indexOf('rgb(');
        if (~index) {
          color = color.slice(index + 5, color.lastIndexOf(','));
          color = color.split(',');
          value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
        } else if (~rindex) {
          color = color.slice(rindex + 4, color.indexOf(')'));
          color = color.split(',');
          value.value = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
        } else value.value = '#011317';
      } else value.value = color.slice(color.indexOf('#'));
    } else value.value = '#011317';
  }
}


// RGB-to-HEX Converter
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



// Saver for block background
function saveBlockBackgroundChangesListener(block) {
  document.getElementsByClassName('help_classb')[0].onclick = function () {
    let value = document.getElementById('bs_bg').value;
    let background = '';
    if (value === '1') {
      background = 'transparent';
    } else if (value === '2') {
      background = hexToRgb(document.getElementById('picker_bs_c').value,
        document.getElementById('picker_bs_opa').value);
    } else if (value === '3') {
      background = document.getElementById('picker_bs_gs1').value +
        '(' + document.getElementById('picker_bs_gs2').value + ',' +
        hexToRgb(document.getElementById('picker_bs_g1').value,
        document.getElementById('picker_bs_opa').value) + ',' +
        hexToRgb(document.getElementById('picker_bs_g2').value,
        document.getElementById('picker_bs_opa').value) + ')'
    } else if (value === '4') {
      let link = document.getElementById('picker_bs_img').value;

      let url = 'url(';
      if (document.querySelector('#picker_bs_img3 input').checked) url = 'fixed url(';

      if (~link.indexOf('[img]')) {
        background = url + link.slice(link.indexOf('[img]') +
          5, link.indexOf('[/img]')) + ') no-repeat'
      } else if (~link.indexOf('src="')) {
        link = link.slice(link.indexOf('src="') + 5);
        background = url + link.slice(0, link.indexOf('"')) + ') no-repeat'
      } else {
        background = url + link + ') no-repeat'
      }
    }
    block.style.background = background;

    getContent(true);
  };
}


// Saves changes to block
function saveBlockSettings(block) {
  let margin = document.getElementById('bs_mar').value;
   if (margin && margin !== 'default') block.style.margin = margin;

  let padding = document.getElementById('bs_pd').value;
   if (padding && padding !== 'default') block.style.padding = padding;

  let textAlign = document.getElementById('bs_ta').value;
   if (textAlign && textAlign !== 'default') block.style.textAlign = textAlign;

  let color = document.getElementById('bs_c').value;
   if (color && color !== '#011317') block.style.color = color;

  let fontFamily = document.getElementById('bs_ff').value;
   if (fontFamily && fontFamily !== 'default') block.style.fontFamily = fontFamily;

  let borderRadius = document.getElementById('bs_bor_r').value;
   if (borderRadius && borderRadius !== 'default') block.style.borderRadius = borderRadius;

  let border = document.getElementById('bs_bor').value;

  if (border === 'none') {
    block.style.border = border;
  } else if (border && border !== 'default') {
    block.style.border = border + ' solid ' + document.getElementById('bs_bor_c').value;
  }

  getContent(true);
}


// Save settings to element & smooth transition
function saveChangesMain() {
  saveContentBoxSettings();
  smoothOpacity('.editor_block_main', '.editor_block_main', '.warning_div.saved');
}


// Saves main settings and checks publishion availability
function saveContentBoxSettings() {
  let bcs_ta = document.getElementById('bcs_ta_s').value;
    if (bcs_ta !== 'default')
      document.getElementById('bcs_ta').textContent = bcs_ta;

  let bcs_c = document.getElementById('bcs_c_s').value;
    if (bcs_c !== '#011317')
      document.getElementById('bcs_c').textContent = bcs_c;

  let bcs_pd = document.getElementById('bcs_pd_s').value;
    if (bcs_pd !== 'default')
     document.getElementById('bcs_pd').textContent = bcs_pd;

  let bcs_ff = document.getElementById('bcs_ff_s').value;
    if (bcs_ff !== 'default')
     document.getElementById('bcs_ff').textContent = bcs_ff;

  document.querySelector('#newarticle legend').textContent =
    document.getElementById('settings__name_input').value;

  addContentBoxStyle('newcontent', true);
  getContent(true);
}


// Saver for element background
function saveElemBackgroundChangesListener(elem, editor_pre) {
  document.getElementsByClassName('help_classel')[0].onclick = function () {
    let value = document.getElementById('es_bg').value;
    let background = '';
    if (value === '1') {
      background = 'transparent';
    } else if (value === '2') {
      background = hexToRgb(document.getElementById('picker_es_c').value,
        document.getElementById('picker_es_opa').value);
    } else if (value === '3') {
      background = document.getElementById('picker_es_gs1').value +
        '(' + document.getElementById('picker_es_gs2').value + ',' +
        hexToRgb(document.getElementById('picker_es_g1').value,
        document.getElementById('picker_es_opa').value) + ',' +
        hexToRgb(document.getElementById('picker_es_g2').value,
        document.getElementById('picker_es_opa').value) + ')'
      console.log(background)
    } else if (value === '4') {
      let link = document.getElementById('picker_es_img').value;

      let url = 'url(';
      if (document.querySelector('#picker_es_img3 input').checked) url = 'fixed url(';

      if (~link.indexOf('[img]')) {
        background = url + link.slice(link.indexOf('[img]') +
          5, link.indexOf('[/img]')) + ') no-repeat'
      } else if (~link.indexOf('src="')) {
        link = link.slice(link.indexOf('src="') + 5);
        background = url + link.slice(0, link.indexOf('"')) + ') no-repeat'
      } else {
        background = url + link + ') no-repeat'
      }
    }
    elem.style.background = background;
    editor_pre.innerHTML = elem.outerHTML + '';

    getContent(true);
  };
}


// Saves changes to element
function saveElemSettings(elem) {
  let margin = document.getElementById('es_mar').value;
   if (margin && margin !== 'default') elem.style.margin = margin;

  let padding = document.getElementById('es_pd').value;
   if (padding && padding !== 'default') elem.style.padding = padding;

  if (elem.tagName === 'IMG') {
    let textAlign = document.getElementById('es_ta').value;
     if (textAlign && textAlign !== 'default') elem.style.float = textAlign;
  } else {
    let textAlign = document.getElementById('es_ta').value;
     if (textAlign && textAlign !== 'default') elem.style.textAlign = textAlign;
  }

  let color = document.getElementById('es_c').value;
   if (color && color !== '#011317') elem.style.color = color;

  let fontFamily = document.getElementById('es_ff').value;
   if (fontFamily && fontFamily !== 'default') elem.style.fontFamily = fontFamily;

  let borderRadius = document.getElementById('es_bor_r').value;
   if (borderRadius && borderRadius !== 'default') elem.style.borderRadius = borderRadius;

  let border = document.getElementById('es_bor').value;
    if (border === 'none') elem.style.border = border;
    else if (border && border !== 'default') {
      elem.style.border = border + ' solid ' + document.getElementById('es_bor_c').value; }

  let width = document.getElementById('es_wid').value;
   if (width && width !== 'default') elem.style.width = width;

  let boxShadow = document.getElementById('es_bsh').value;
    if (boxShadow === '') elem.style.boxShadow = '';
    else if (boxShadow && boxShadow !== 'default') {
      elem.style.boxShadow = boxShadow + ' ' + document.getElementById('es_bsh_c').value; }

  let fontWeight = document.getElementById('es_fw').value;
    if (fontWeight && fontWeight !== 'default') elem.style.fontWeight = fontWeight;

  let fontStyle = document.getElementById('es_fst').value;
    if (fontStyle && fontStyle !== 'default') elem.style.fontStyle = fontStyle;

  let decoration = document.getElementById('es_fd').value;
    if (decoration && decoration !== 'default') elem.style.textDecoration = decoration;

  let fontSize = document.getElementById('es_fsz').value;
    if (fontSize && fontSize !== 'default') elem.style.fontSize = fontSize;

  let textShadow = document.getElementById('es_fsh').value;
    if (textShadow === '') elem.style.boxShadow = '';
    else if (textShadow && textShadow !== 'default') {
      elem.style.textShadow = textShadow + ' ' + document.getElementById('es_fsh_c').value; }

  getContent(true);
}


// POST form fixer for scheme
function schemeFixer() {
  if (document.body.classList.contains('red_scheme_body')) {
    document.getElementById('scheme_fixer').value = 'night';
  }
}


// Helper to show current settings of loaded element/block
function setDefaultOrValue(select, value, defVal='default') {
  if (!value || value === defVal) { select.value = defVal; return; }
  let children = select.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].value === value) { select.value = value; return; }}}

  children[0].textContent = value;
  children[0].setAttribute('selected', 'yes');
}


// Sets the help button position
function setLeftForHelpBotton() {
  let help = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    help.style.left = (document.documentElement.offsetWidth -
      help.getBoundingClientRect().width) / 2 + 'px';
}


// Image help listener, block
function setListenerBlockImgHelp() {
  document.getElementById('picker_bs_img2').onclick =
    document.getElementById('picker_bs_img2_closer').onclick = function () {
      toggleDisclaimerEditorMainBlock('picker_bs_img2_disclaimer');
    };
}


// Image help listener, element
function setListenerElementImgHelp() {
  document.getElementById('picker_es_img2').onclick =
    document.getElementById('picker_es_img2_closer').onclick = function () {
      toggleDisclaimerEditorMainBlock('picker_es_img2_disclaimer');
    };
}


// Adds listeners to delete block button
function setListenerToBlockDeletion(block) {
  let confirm = document.getElementsByClassName('delete_block_conformation')[0];

    document.getElementsByClassName('delete_block')[0].onclick = function() {
      confirm.classList.add('open');
    };

    confirm.children[0].onclick = function() {
      document.getElementById('newcontent').removeChild(block);
      document.getElementById('elem__tree').innerHTML = '';
      createElementsTree();
      confirm.classList.remove('open');
      smoothOpacity('.editor_block', '.editor_block_main');
      showMainHelpButton();
      document.getElementById('drag_elem_name').textContent = 'Свойства статьи';
    };

    confirm.children[1].onclick = function() {
      confirm.classList.remove('open');
    };
}


// Listeners for main buttons of the block
function setListenerToButtonsBlock(block, li, i) {
  document.querySelector('.editor_block .info-elem').onclick =
    document.getElementsByClassName('editor_block_disclaimer_closer')[0].onclick =
      function() { toggleDisclaimerEditorMainBlock('editor_block_disclaimer'); };

  document.querySelector('.editor_block .get_upwards').onclick = getUpwardsBlock;

  createButtonsListeners(block, i);
}


// Listeners for main buttons of element
function setListenerToButtonsElement(elem, i) {
  document.querySelector('.editor_element .info-elem').onclick =
    document.getElementsByClassName('editor_element_disclaimer_closer')[0].onclick =
      function() { toggleDisclaimerEditorMainBlock('editor_element_disclaimer'); };

  document.querySelector('.editor_element .get_upwards').onclick = function() {
    getUpwardsElement(elem, i);
  };
}


// Adds listeners to delete element button
function setListenerToElementDeletion(elem, i) {
  let confirm = document.getElementsByClassName('delete_element_conformation')[0];

    document.getElementsByClassName('delete_elem')[0].onclick = function() {
      confirm.classList.add('open');
    };

    confirm.children[0].onclick = function() {
      document.getElementById('newcontent').children[i].removeChild(elem);
      document.getElementById('elem__tree').innerHTML = '';
      createElementsTree();
      confirm.classList.remove('open');
      document.getElementById('elem__tree').children[i-1].children[0].click()
    };

    confirm.children[1].onclick = function() {
      confirm.classList.remove('open');
    };
}


// Visual effect for selection of choosen font
function setListenerToFontPicker() {
  let select = document.getElementById('bcs_ff_s');
    select.onchange = function() {
      this.style.fontFamily = select.value;
    }
}


// Block moving listeners
function setListenersToMoveUpDownButtons(block, i) {
  let down = document.getElementsByClassName('block_move_down')[0];
  let up = document.getElementsByClassName('block_move_up')[0];
  let prev = block.previousElementSibling;
  let next = block.nextElementSibling;
  let tree = document.getElementById('elem__tree');

  if (next) {
    down.removeAttribute('disabled');
    down.onclick = function() {
      block.parentNode.insertBefore(next, block);
      tree.innerHTML = '';
      createElementsTree();
      tree.children[i].children[0].click()
    }
  }
  else down.setAttribute('disabled', '1');

  if (prev && prev.tagName === 'DIV') {
    up.removeAttribute('disabled');
    up.onclick = function() {
      block.parentNode.insertBefore(block, prev);
      tree.innerHTML = '';
      createElementsTree();
      tree.children[i-2].children[0].click()
    }
  }
  else up.setAttribute('disabled', '1');
}


// Adds listeners to block's name changer
function setListenerToNameChanger(block, li) {
  let input = document.getElementById('editor_block_name_change');
  let label = document.getElementById('editor_block_label');
  let editor = document.getElementsByClassName('edit_label')[0];
    input.addEventListener('focus', function() {
      label.style.opacity = '0';
      input.value = label.textContent;
        editor.classList.add('open');
        editor.onclick = function() {
          changeBlockName(block, li, input, label);
        };

      document.getElementsByClassName('delete_block')[0]
        .classList.remove('open');
      input.addEventListener('keydown', clickEditBlockName)
    });

    input.addEventListener('focusout', function() {
      label.style.opacity = '1';
      setTimeout(function() {
        editor.classList.remove('open');
        input.value = '';
        document.getElementsByClassName('delete_block')[0].classList.add('open');
        input.removeEventListener('keydown', clickEditBlockName)
      }, 500);
    });

  function clickEditBlockName() {
    if (event.keyCode === 13) {
      document.getElementsByClassName('edit_label')[0].focus();
    }
  }
}


// Adds listeners to element's name changer
function setListenerToNameChangerElement(elem, innerLi) {
  let input = document.getElementById('editor_element_name_change');
  let label = document.getElementById('editor_content_label');
  let editor = document.querySelector('.element_button.edit_label');
    input.addEventListener('focus', function() {
      label.style.opacity = '0';
      input.value = label.textContent;
        editor.classList.add('open');
        editor.onclick = function() {
          changeElementName(elem, innerLi, input, label);
        };

      document.getElementsByClassName('delete_elem')[0]
        .classList.remove('open');
      input.addEventListener('keydown', clickEditElemName)
    });

    input.addEventListener('focusout', function() {
      label.style.opacity = '1';
      setTimeout(function() {
        editor.classList.remove('open');
        input.value = '';
        document.getElementsByClassName('delete_elem')[0].classList.add('open');
        input.removeEventListener('keydown', clickEditElemName)
      }, 500);
    });

  function clickEditElemName() {
    if (event.keyCode === 13) {
      document.querySelector('.element_button.edit_label').focus();
    }
  }
}


// Sets main style settings to loaded article settings if existed
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

   document.getElementById('settings__name_input').value =
     document.querySelector('#newarticle legend').textContent.trim();
}


// Helper to set main settings theme selector on current theme in edit version
function setThemeOnLoad(theme) {
  document.getElementById('settings__theme_selector').textContent = theme;
}


// Main settings background picker button controller
function showBackgroundPicker(index=0) {
  document.getElementsByClassName('background_picker_m')[index]
    .classList.toggle('open');
    if (event.target.innerHTML === 'Изменить') {
      event.target.innerHTML = 'Скрыть';
    } else {
      event.target.innerHTML = 'Изменить';
    }
}


// Adds visibility to block settings
function showBlockSettings(block) {
  document.querySelector('.draggable_properties.block_single').classList.add('open');
}


// Shows creates element div
function showCreateElemDiv() {
  document.getElementById('create_element_div').classList.toggle('open');
}


// Adds visibility to element settings
function showElementSettings(elem) {
  document.querySelector('.draggable_properties.elem_single').classList.add('open');
}


// Shows tree help
function showHelpImagesAndWebDev() {
  document.getElementsByClassName('helper_tree')[0].classList.toggle('open');
  event.target.classList.toggle('pushed_help');
}


// Shows main settings & main help button
function showMainHelpButton() {
  let opener = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    opener.classList.add('open');
  document.querySelector('.draggable_properties.block_main')
        .classList.add('open');

  setTimeout(function () { opener.style.opacity = '1'; }, 50);
  notShowBlockSettings();
  notShowElementSettings();
}


// Dynamic preview listener for textarea
function showPreview() {
  let pre = document.getElementById('editor_pre');
  if (pre.children[0]) pre.children[0].innerHTML = (event.target.value + '');
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


// Tree help animation
function startAnimation() {
  let li = event.target;
  li.classList.add('active_animation');

  li.addEventListener('animationend', function() {
      li.classList.remove('active_animation');
    });
}


// Main settings background submition script
function submitBackgroundChangesMain() {
  let value = document.getElementById('bcs_bg_s').value;
  let background = document.getElementById('bcs_bg');
    if (value === '1') {
      background.textContent = 'transparent';
    } else if (value === '2') {
      background.textContent = hexToRgb(document.getElementById('picker_m_c').value,
        document.getElementById('picker_m_opa').value);
    } else if (value === '3') {
      background.textContent = document.getElementById('picker_m_gs1').value +
        '(' + document.getElementById('picker_m_gs2').value + ',' +
        hexToRgb(document.getElementById('picker_m_g1').value,
        document.getElementById('picker_m_opa').value) + ',' +
        hexToRgb(document.getElementById('picker_m_g2').value,
        document.getElementById('picker_m_opa').value) + ')'
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

  addContentBoxStyle('newcontent', true);
  getContent(true);
  smoothOpacity('.editor_block_main', '.editor_block_main', '.warning_div.saved');
}


// Textarea tab listener (-ex new line listener - \n realization)
function textareaNListener() {
  let area = document.getElementById('editor_content');
    area.addEventListener('keydown', function() {
      if (event.keyCode === 9) listenerEnterAndTabs('\t');
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


// Smooth toggle for main settings disclaimer
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


function setStyleOfEditor(tagName) {
  let editor = document.getElementById('editor_content');
  let editor_pre = document.getElementById('editor_pre');
  let img_loader = document.getElementsByClassName('load-img-pre')[0];
  if (tagName === 'IMG') {
    editor.classList.remove('editor_for_header');
    editor.classList.add('editor_for_img');
    editor_pre.classList.add('pre_for_img');
    img_loader.classList.add('div_for_img');
  } else if (tagName === 'H2') {
    editor.classList.remove('editor_for_img');
    editor_pre.classList.remove('pre_for_img');
    img_loader.classList.remove('div_for_img');
    editor.classList.add('editor_for_header');
  } else {
    editor.classList.remove('editor_for_img');
    editor.classList.remove('editor_for_header');
    img_loader.classList.remove('div_for_img');
    editor_pre.classList.remove('pre_for_img');
  }
}


function loadImageForImg(elem, editor_pre) {
  document.getElementsByClassName('pre-image_button')[0].onclick = function () {
    let link = document.getElementById('pre-image-input').value;
    if (~link.indexOf('[img]')) {
      link = link.slice(link.indexOf('[img]') + 5, link.indexOf('[/img]'));
    } else if (~link.indexOf('src="')) {
      link = link.slice(link.indexOf('src="')+5);
      link = link.slice(0, link.indexOf('"'));
    }
    elem.src = link;
    editor_pre.innerHTML = elem.outerHTML + '';
  }
}


function getRidOfExtraSettingsForImage() {
  document.querySelector('.draggable_properties.elem_single').classList.add('img_closed');
}


function showAllFields() {
  document.querySelector('.draggable_properties.elem_single').classList.remove('img_closed');
}


function setWebDeveloperButton(thing, index) {
  document.getElementsByClassName('web_developer_on')[index].onclick = function() {
    document.getElementsByClassName('web_developer')[0].classList.add('on_develop');
  };
  document.getElementById('web_developer_submit').onclick = function() {
    document.getElementsByClassName('web_developer')[0].classList.remove('on_develop');
    thing.dataset.developer = document.getElementById('web_developer_text').value;
    developerDecoding(thing, thing.dataset.developer);
    document.getElementById('editor_pre').innerHTML = thing.outerHTML + '';;
  }
}
