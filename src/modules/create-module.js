const data = JSON.parse(localStorage.getItem('Data')) || [];
const input = document.querySelector('.List-add');
const array = document.querySelector('.List');
const { LinkedList } = require('./linkedList-module.js');

const list = new LinkedList();

let index = 0;
data.forEach((item) => {
  list.append(item.value, item.completed, index);
  const checked = item.completed ? 'checked' : '';
  const task = `
    <li class="list_item" id ="${index}">
        <input name="task${index}" type="checkbox" ${checked} class="checkbox">
        <label for="task${index}">${item.value}</label>
        <button>-</button>
    </li>
    <hr/>`;
  const Child = document.createRange().createContextualFragment(task);
  array.appendChild(Child);
  index += 1;
});

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const data = JSON.parse(localStorage.getItem('Data')) || [];
    list.append(input.value, false, data.length);
    const task = `
    <li class="list_item" id="${data.length}" draggable="true">
        <input name="task${data.length}" type="checkbox"  class="checkbox">
        <label for="task${data.length}">${input.value}</label>
        <button>-</button>
    </li>
    <hr/>`;
    const Child = document.createRange().createContextualFragment(task);
    array.appendChild(Child);
    localStorage.setItem('Data', JSON.stringify(list.toArray()));
    input.value = '';
  }
});
