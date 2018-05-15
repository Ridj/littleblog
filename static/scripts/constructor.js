/* ADDITIONAL PAGE LOADER */
(function () {
  setLeftForHelpBotton();
  createElementsTree();
  textareaNListener();

  window.addEventListener('resize', setLeftForHelpBotton, false);
})();


/* FUNCTIONS */
// Article form filling
function acceptChangesToArticle(username) {
  let contentFull = getContent();
  document.getElementById('id_author').value = username;
  document.getElementById('id_content').value = contentFull[0];
  document.getElementById('id_content_add').value = contentFull[1];
  document.getElementById('id_name').value =
    document.querySelector('#newarticle legend').textContent;
  document.getElementById('id_theme').value =
    document.getElementsByClassName('settings__theme_selector')[0].value;
}


function confirmPublication(name=false) {
  if (name) acceptChangesToArticle(name);

  document.getElementsByClassName('article__form_div')[0]
    .classList.toggle('open');
}


// Creates the Element Tree
function createElementsTree() {
  let tree = document.getElementById('elem__tree');
  let editor = document.getElementById('editor_content');
  let editor_pre = document.getElementById('editor_pre');
  let content = document.getElementById('newcontent').children;

    for (let i = 0; i < content.length; i++) {
      let li = document.createElement('li');
        let innerContent = content[i].children;
          li.innerText = content[i].tagName;

        if (content[i].children.length) {
          let ul = document.createElement('ul');

            for (let j = 0; j < innerContent.length; j++) {
              let innerLi = document.createElement('li');
                innerLi.innerText = innerContent[j].tagName;
                innerLi.onclick = function() {
                  editor.value = innerContent[j].textContent;
                  editor_pre.innerHTML =
                    innerContent[j].outerHTML + '';
                  openElementEditor();
                  setListenerToSaveButton(content[i]);
                };

              ul.appendChild(innerLi);
            }
          li.appendChild(ul);
        } else {
          li.onclick = function() {
                  editor.value = content[i].textContent;
                  editor_pre.innerHTML = content[i].outerHTML + '';
                  openElementEditor();
                  setListenerToSaveButton(editor, content[i]);
          };
        }

      tree.appendChild(li);
    }
}


function setListenerToSaveButton(editor, elem) {
  let button = document.querySelector('.editor_element .accept-elem');
    button.addEventListener('click', saveListener);

  function saveListener() {
    elem.textContent = editor.value;
    editor.value = '';
    getContent(true);
    button.removeEventListener('click', saveListener);
  }
}


function openElementEditor() {
  if (document.querySelector('.editor_block.open')) {
    smoothOpacity('.editor_block','.editor_element');
  } else if (document.querySelector('.editor_block_main.open')) {
    smoothOpacity('.editor_block_main','.editor_element');
  }
}


// Elements changes manager
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


function saveChanges(flag=false) {
  if (flag) {
    saveElemSettings();
    smoothOpacity('.editor_block_main', '.editor_block_main', '.warning_div.saved');
    return;
  }

  if (document.querySelector('.editor_element.open')) {
    saveElemSettings();
    smoothOpacity('.editor_element', findBlockOrMain(), '.warning_div.saved');
    resetElemSettings();
  } else {
    saveElemSettings();
    smoothOpacity('.editor_block', '.editor_block_main', '.warning_div.saved');
    resetElemSettings();
  }
}

function saveElemSettings() {}
function resetElemSettings() {}



function smoothOpacity(elem, next, optional=false) {
  let close = document.querySelector(elem);
  let open = document.querySelector(next);
    if (optional) {
      let div = document.querySelector(optional);
        div.style.opacity = '0';
        div.classList.toggle('open');
        setTimeout(function() {
          div.style.opacity = '.2';
        }, 50);

        setTimeout(function() {
          div.style.opacity = '0';
        }, 250);

        setTimeout(function() {
          div.classList.toggle('open');
          div.style.opacity = '.2';
        }, 500);
    }

    open.style.opacity = '0';
    open.classList.toggle('open');
    setTimeout(function() {
      open.style.opacity = '1';
    }, 50);

    close.style.opacity = '0';
      setTimeout(function() {
        close.classList.toggle('open');
        close.style.opacity = '1';
      }, 500)
}


// -- on progress -- Search for parent block
function findBlockOrMain() {
  return '.editor_block';
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

  return [base, additional];
}


// Sets the help button position
function setLeftForHelpBotton() {
  let help = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    help.style.left = (document.documentElement.offsetWidth -
      help.getBoundingClientRect().width) / 2 + 'px';
}


// Dynamic preview for textarea
function showPreview(flag=false) {
  let pre = document.getElementById('editor_pre');
  if (pre.children[0]) {
    pre.children[0].innerHTML = event.target.value + '';
  } else {
    pre.innerHTML = event.target.value + '';
  }
}


function preventNewLine() {
  if (event.keyCode === 13) {
    event.preventDefault();
    return false;
  }
}


function textareaNListener() {
  let area = document.getElementById('editor_content');
    area.addEventListener('keydown', function() {
      if (event.keyCode === 13) {
        let value = event.target.value;
        let selection = event.target.selectionStart;
        event.target.value = value.slice(0, selection) + '⤓' + '\n' +
        value.slice(selection);

        area.selectionStart = selection + 2;
        area.selectionEnd = selection + 2;
      }
    })
}
