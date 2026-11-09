const { test } = require('node:test');
const assert = require('node:assert/strict');
const { BinarySearchTree } = require('../src/binary-search-tree');
const { Queue } = require('../src/queue');
const { Stack } = require('../src/stack');
const { removeKFromList } = require('../src/remove-from-list');
const { ListNode } = require('../extensions/list-node');

test('tree handles empty state, duplicates and all removal cases', () => {
  const examples = [
    [0],
    [2, 1],
    [2, 3],
    [5, 2, 8, 6, 7, 9],
    [5, 2, 8, 9],
    [5, 2, 8, 1, 3, 6, 9],
    [0, -2, 2, -3, -1, 1, 3]
  ];

  for (const values of examples) {
    const tree = new BinarySearchTree();
    assert.equal(tree.root(), null);
    assert.equal(tree.min(), null);
    assert.equal(tree.max(), null);
    assert.equal(tree.find(100), null);
    tree.remove(100);

    for (const value of values) {
      tree.add(value);
      tree.add(value);
    }
    tree.remove(100);

    const remaining = values.slice().sort((a, b) => a - b);
    for (const value of values) {
      tree.remove(value);
      remaining.splice(remaining.indexOf(value), 1);
      assert.equal(tree.has(value), false);
      for (const other of remaining) {
        assert.equal(tree.find(other).data, other);
      }
      assert.equal(tree.min(), remaining.length === 0 ? null : remaining[0]);
      assert.equal(tree.max(), remaining.length === 0 ? null : remaining[remaining.length - 1]);
    }
    assert.equal(tree.root(), null);
  }
});

test('queue can be emptied and reused, including falsy values', () => {
  const queue = new Queue();
  for (const value of [0, false, '', null, undefined]) {
    queue.enqueue(value);
    assert.deepEqual(queue.getUnderlyingList(), { value, next: null });
    assert.equal(queue.dequeue(), value);
    assert.equal(queue.getUnderlyingList(), null);
    assert.equal(queue.dequeue(), undefined);
  }
  const other = new Queue();
  queue.enqueue(1);
  assert.equal(other.getUnderlyingList(), null);
});

test('stack keeps instances separate and peek does not remove values', () => {
  const stack = new Stack();
  const other = new Stack();
  stack.push(0);
  assert.equal(stack.peek(), 0);
  assert.equal(stack.peek(), 0);
  assert.equal(other.pop(), undefined);
  assert.equal(stack.pop(), 0);
  assert.equal(stack.peek(), undefined);
});

test('list removal handles empty lists, repeated heads and all matches', () => {
  assert.equal(removeKFromList(null, 3), null);
  const first = new ListNode(3);
  first.next = new ListNode(3);
  first.next.next = new ListNode(1);
  first.next.next.next = new ListNode(3);
  const kept = first.next.next;
  assert.equal(removeKFromList(first, 3), kept);
  assert.equal(kept.next, null);
  assert.equal(removeKFromList(kept, 2), kept);
  assert.equal(removeKFromList(kept, 1), null);
});
