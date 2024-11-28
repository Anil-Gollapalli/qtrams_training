// Node Class
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Tree Class
  class Tree {
    constructor(array) {
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  
    // Build Tree
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
  
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }
  
    // Insert
    insert(value, node = this.root) {
      if (!node) return new Node(value);
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
  
      return node;
    }
  
    // Delete
    deleteItem(value, node = this.root) {
      if (!node) return node;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        const minNode = this.findMin(node.right);
        node.data = minNode.data;
        node.right = this.deleteItem(minNode.data, node.right);
      }
      return node;
    }
  
    findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  
    // Find
    find(value, node = this.root) {
      if (!node || node.data === value) return node;
  
      if (value < node.data) {
        return this.find(value, node.left);
      } else {
        return this.find(value, node.right);
      }
    }
  
    // Level Order
    levelOrder(callback) {
      if (!callback) throw new Error("Callback function is required!");
  
      const queue = [this.root];
      while (queue.length) {
        const current = queue.shift();
        callback(current);
  
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
  
    // Depth-First Traversals
    inOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required!");
      if (node) {
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }
  
    preOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required!");
      if (node) {
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }
  
    postOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required!");
      if (node) {
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }
  
    // Height
    height(node) {
      if (!node) return -1;
      return (
        1 + Math.max(this.height(node.left), this.height(node.right))
      );
    }
  
    // Depth
    depth(node, current = this.root, level = 0) {
      if (!current) return -1;
  
      if (node.data === current.data) return level;
  
      if (node.data < current.data) {
        return this.depth(node, current.left, level + 1);
      } else {
        return this.depth(node, current.right, level + 1);
      }
    }
  
    // Is Balanced
    isBalanced(node = this.root) {
      if (!node) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    }
  
    // Rebalance
    rebalance() {
      const values = [];
      this.inOrder(node => values.push(node.data));
      this.root = this.buildTree(values);
    }
  
    // Pretty Print
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) return;
  
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    }
  }
  
  // Example Usage
  const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree(array);
  
  console.log("Tree structure:");
  tree.prettyPrint();
  
  console.log("Is balanced:", tree.isBalanced());
  
  console.log("Level Order:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre Order:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post Order:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("In Order:");
  tree.inOrder(node => console.log(node.data));
  
  // Unbalancing tree
  [150, 200, 300].forEach(val => tree.insert(val));
  console.log("Tree after unbalancing:");
  tree.prettyPrint();
  
  console.log("Is balanced:", tree.isBalanced());
  
  // Rebalancing tree
  tree.rebalance();
  console.log("Tree after rebalancing:");
  tree.prettyPrint();
  
  console.log("Is balanced:", tree.isBalanced());
  