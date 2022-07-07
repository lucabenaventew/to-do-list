import LinkedList from './LinkedList.js';
import edit from './Edit.js';

const Input = document.querySelector('.list-add');
const array = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('Data')) || [];

let SltBtn = document.querySelectorAll('.checkbox');
let EdtBtn = document.querySelectorAll('.edit');

let list = new LinkedList();

export const refreshDom = () => {
  const node = document.querySelectorAll('.list_item');
  let index = 0;
  node.forEach((item) => {
    item.id = index;
    index += 1;
  });
};

export const refresh = () => {
  let index2 = 0;
  data = JSON.parse(localStorage.getItem('Data')) || [];
  list = new LinkedList();
  SltBtn = document.querySelectorAll('.checkbox');
  SltBtn.forEach((item) => {
    item.onchange = () => {
      list.toArray()[item.parentNode.id].completed = item.checked;
      localStorage.setItem('Data', JSON.stringify(list.toArray()));
      refresh();
      refreshDom();
    };
  });

  EdtBtn = document.querySelectorAll('.edit');
  EdtBtn.forEach((item) => {
    item.onclick = () => {
      edit(item, list);
      refresh();
      refreshDom();
    };
  });

  data.forEach((item) => {
    list.append(item.value, item.completed, index2);
    localStorage.setItem('Data', JSON.stringify(list.toArray()));
    index2 += 1;
  });
};

const Draw = (data, index) => {
  const checked = data.completed ? 'checked' : '';
  const task = `
    <li class="list_item" id="${index}">
        <input type="checkbox" name="task" ${checked} class="checkbox">
        <label class="task" for="task">${data.value}</label>
        <button class="edit"></button>
    </li>`;
  const Child = document.createRange().createContextualFragment(task);
  array.appendChild(Child);
  Input.value = '';
};

Input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    refresh();
    list.append(Input.value, false, data.length);
    localStorage.setItem('Data', JSON.stringify(list.toArray()));
    Draw(list.toArray()[data.length], data.length);
    refresh();
  }
});

window.onload = () => {
  EdtBtn.forEach((item) => {
    item.onclick = () => {
      refresh();
      refreshDom();
      edit(item, list);
    };
  });
  SltBtn.forEach((item) => {
    item.onchange = () => {
      refresh();
      refreshDom();
      list.toArray()[item.parentNode.id].completed = item.checked;
      localStorage.setItem('Data', JSON.stringify(list.toArray()));
    };
  });
};

//  Usage of saved data
data.forEach((item) => {
  Draw(item, item.index);
});

// Clear
const Clear = document.querySelector('.list-clear');
Clear.onclick = () => {
  const node = document.querySelectorAll('.list_item');
  node.forEach((item) => {
    if (item.children[0].checked) {
      list.delete(item.id);
      localStorage.setItem('Data', JSON.stringify(list.toArray()));
      item.remove();
      refresh();
      refreshDom();
    }
  });
};
