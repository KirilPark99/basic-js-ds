const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    if (this.head === null) {
      return null;
    }

    // The tests expect plain objects, not ListNode instances.
    const list = { value: this.head.value, next: null };
    let last = list;
    let current = this.head.next;

    while (current !== null) {
      last.next = { value: current.value, next: null };
      last = last.next;
      current = current.next;
    }

    return list;
  }

  enqueue(value) {
    const node = new ListNode(value);

    if (this.tail === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
  }

  dequeue() {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    return value;
  }
}

module.exports = {
  Queue
};
