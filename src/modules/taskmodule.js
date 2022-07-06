export default class Node {
  constructor(value, completed, index, next = null) {
    this.value = value;
    this.completed = completed;
    this.index = index;
    this.next = next;
  }
}
