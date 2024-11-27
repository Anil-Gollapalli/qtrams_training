class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array = []) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      return this.buildBST(sortedArray);
    }
  
    buildBST(array) {
      if (array.length === 0) return null;
      const mid = Math.floor(array.length / 2);
      const node = new Node(array[mid]);
      node.left = this.buildBST(array.slice(0, mid));
      node.right = this.buildBST(array.slice(mid + 1));
      return node;
    }
  
    insert(value) {
      if (this.find(value)) {
        alert('Value already exists in the tree!');
        return;
      }
      const newNode = new Node(value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
      this.insertNode(this.root, newNode);
    }
  
    insertNode(node, newNode) {
      if (newNode.data < node.data) {
        if (node.left) {
          this.insertNode(node.left, newNode);
        } else {
          node.left = newNode;
        }
      } else {
        if (node.right) {
          this.insertNode(node.right, newNode);
        } else {
          node.right = newNode;
        }
      }
    }
  
    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }
  
    deleteNode(node, value) {
      if (!node) return node;
      if (value < node.data) {
        node.left = this.deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = this.deleteNode(node.right, value);
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        node.data = this.minValue(node.right);
        node.right = this.deleteNode(node.right, node.data);
      }
      return node;
    }
  
    minValue(node) {
      let min = node.data;
      while (node.left) {
        min = node.left.data;
        node = node.left;
      }
      return min;
    }
  
    find(value) {
      return this.findNode(this.root, value);
    }
  
    findNode(node, value) {
      if (!node) return null;
      if (value < node.data) {
        return this.findNode(node.left, value);
      } else if (value > node.data) {
        return this.findNode(node.right, value);
      }
      return node;
    }
  
    levelOrder(callback) {
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback) {
      this.inOrderTraversal(this.root, callback);
    }
  
    inOrderTraversal(node, callback) {
      if (node === null) return;
      this.inOrderTraversal(node.left, callback);
      callback(node);
      this.inOrderTraversal(node.right, callback);
    }
  
    preOrder(callback) {
      this.preOrderTraversal(this.root, callback);
    }
  
    preOrderTraversal(node, callback) {
      if (node === null) return;
      callback(node);
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }
  
    postOrder(callback) {
      this.postOrderTraversal(this.root, callback);
    }
  
    postOrderTraversal(node, callback) {
      if (node === null) return;
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node);
    }
  
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) return "";
      let output = "";
      if (node.right !== null) {
        output += this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      output += `${prefix}${isLeft ? "└── " : "┌── "}${node.data}\n`;
      if (node.left !== null) {
        output += this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
      return output;
    }
  }
  
  const tree = new Tree();
  
  function insertNode() {
    const value = document.getElementById('insertValue').value;
    if (value) {
      tree.insert(Number(value));
      updateTree();
    }
  }
  
  function deleteNode() {
    const value = document.getElementById('deleteValue').value;
    if (value) {
      tree.deleteItem(Number(value));
      updateTree();
    }
  }
  
  function levelOrderTraversal() {
    const output = [];
    tree.levelOrder(node => output.push(node.data));
    document.getElementById('treeOutput').textContent = `Level Order: ${output.join(', ')}`;
  }
  
  function inOrderTraversal() {
    const output = [];
    tree.inOrder(node => output.push(node.data));
    document.getElementById('treeOutput').textContent = `In-Order: ${output.join(', ')}`;
  }
  
  function preOrderTraversal() {
    const output = [];
    tree.preOrder(node => output.push(node.data));
    document.getElementById('treeOutput').textContent = `Pre-Order: ${output.join(', ')}`;
  }
  
  function postOrderTraversal() {
    const output = [];
    tree.postOrder(node => output.push(node.data));
    document.getElementById('treeOutput').textContent = `Post-Order: ${output.join(', ')}`;
  }
  
  function updateTree() {
    const treeString = tree.prettyPrint(tree.root);
    document.getElementById('prettyPrintOutput').textContent = treeString;
  }
  
  updateTree();
  