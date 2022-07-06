import Node from './task-module.js';

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = 0;
    this.length = 0;
  }

  append(value, completed, index) {
    const newNode = new Node(value, completed, index);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }
}

module.exports = { LinkedList };
