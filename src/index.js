import './style.css';
import './modules/linkedListmodule.js';

const array = document.querySelector('.list');
const { LinkedList } = require('./modules/linkedListmodule.js');

const list = new LinkedList();

const arr = [
  {
    value: 'Todo1',
    completed: false,
    index: 0,
  },
  {
    value: 'Todo2',
    completed: false,
    index: 1,
  },
  {
    value: 'Todo3',
    completed: false,
    index: 2,
  },
  {
    value: 'Todo4',
    completed: false,
    index: 3,
  },
  {
    value: 'Todo5',
    completed: false,
    index: 4,
  },
];

arr.forEach((item) => {
  list.append(item.value, item.completed, item.index);
  const checked = item.completed ? 'checked' : '';
  const task = `
      <li class="list_item" id ="${item.index}">
          <input name="task${item.index}" type="checkbox" ${checked} class="checkbox">
          <label for="task${item.index}">${item.value}</label>
          <button>-</button>
      </li>
      <hr/>`;
  const child = document.createRange().createContextualFragment(task);
  array.appendChild(child);
});

const data = JSON.parse(localStorage.getItem('data')) || [];
const check = document.querySelector('.checkbox');

data.forEach((item) => {
  list.appendChild(item);
});
check.forEach((item) => {
  item.addEventListener('change', () => {
    data[item.parentNode].completed = item.checked;
    localStorage.setItem('data', JSON.stringify(data));
  });
});
