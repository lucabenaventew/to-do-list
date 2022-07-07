import LinkedList from './LinkedList.js';

export const refreshDom = () => {
  const node = document.querySelectorAll('.list_item');
  let index = 0;
  node.forEach((item) => {
    item.id = index;
    index += 1;
  });
};

export const refresh = () => {
  const list = new LinkedList();
  const SltBtn = document.querySelectorAll('.checkbox');
  SltBtn.forEach((item) => {
    item.onchange = () => {
      list.toArray()[item.parentNode.id].completed = item.checked;
      localStorage.setItem('Data', JSON.stringify(list.toArray()));
    };
  });
};

export default function edit(item, list) {
  if (item.classList.contains('delete')) {
    list.delete(item.parentElement.id);
    localStorage.setItem('Data', JSON.stringify(list.toArray()));
    item.parentNode.remove();
    refreshDom();
    refresh();
  }
  item.classList.add('delete');
  item.classList.remove('edit');
  item.parentElement.children[1].setAttribute('contenteditable', true);
  item.parentElement.children[1].addEventListener('input', () => {
    list.toArray()[item.parentNode.id].value = item.parentElement.children[1].innerHTML;
    localStorage.setItem('Data', JSON.stringify(list.toArray()));
  });
  window.addEventListener('click', (e) => {
    const ClickInide = item.parentElement.contains(e.target);
    if (!ClickInide) {
      item.classList.add('edit');
      item.classList.remove('delete');
      item.parentElement.children[1].removeAttribute('contenteditable');
    }
  });
  item.parentElement.children[1].addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      item.classList.add('edit');
      item.classList.remove('delete');
      item.parentElement.children[1].removeAttribute('contenteditable');
    }
  });
} 
