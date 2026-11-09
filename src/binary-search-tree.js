const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new Node(data);
      return;
    }

    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return;
      }

      if (data < current.data) {
        if (current.left === null) {
          current.left = new Node(data);
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(data);
          return;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return current;
      }

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    let parent = null;
    let current = this.rootNode;

    while (current !== null && current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) {
      return;
    }

    if (current.left !== null && current.right !== null) {
      let nextParent = current;
      let next = current.right;

      while (next.left !== null) {
        nextParent = next;
        next = next.left;
      }

      current.data = next.data;
      parent = nextParent;
      current = next;
    }

    let child = current.left;
    if (child === null) {
      child = current.right;
    }

    if (parent === null) {
      this.rootNode = child;
    } else if (parent.left === current) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  min() {
    let current = this.rootNode;
    if (current === null) {
      return null;
    }

    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    let current = this.rootNode;
    if (current === null) {
      return null;
    }

    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};