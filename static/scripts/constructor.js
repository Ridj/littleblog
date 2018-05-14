(function () {
  setLeftForHelpBotton();
  createElementsTree();

  window.addEventListener('resize', setLeftForHelpBotton, false);
})();


function confirmPublication() {
  document.getElementsByClassName('article__form_div')[0].classList.toggle('open');
}


function createElementsTree() {
  let tree = document.getElementById('elem__tree');
  let editor = document.getElementById('editor_content');
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
                };

              ul.appendChild(innerLi);
            }
          li.appendChild(ul);
        } else {
          li.onclick = function() {
            editor.value = content[i].textContent;
          };
        }

      tree.appendChild(li);
    }
}


function setLeftForHelpBotton() {
  let help = document.getElementsByClassName('constructor__disclaimer_opener')[0];
    help.style.left = (document.documentElement.offsetWidth -
      help.getBoundingClientRect().width) / 2 + 'px';
}
