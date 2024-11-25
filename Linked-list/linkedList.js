export class Node {
    constructor(value) {
      this.value = value;
      this.nextNode = null;
    }
  }
  
  export class LinkedList {
    constructor() {
      this.headNode = null;
    }
  
    append(value) {
      const newNode = new Node(value);
      if (!this.headNode) {
        this.headNode = newNode;
      } else {
        let current = this.headNode;
        while (current.nextNode) {
          current = current.nextNode;
        }
        current.nextNode = newNode;
      }
    }
  
    prepend(value) {
      const newNode = new Node(value);
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
    }
  
    size() {
      let count = 0;
      let current = this.headNode;
      while (current) {
        count++;
        current = current.nextNode;
      }
      return count;
    }
  
    head() {
      return this.headNode;
    }
  
    tail() {
      let current = this.headNode;
      if (!current) return null;
      while (current.nextNode) {
        current = current.nextNode;
      }
      return current;
    }
  
    at(index) {
      let count = 0;
      let current = this.headNode;
      while (current) {
        if (count === index) return current;
        count++;
        current = current.nextNode;
      }
      return null;
    }
  
    pop() {
      if (!this.headNode) return null;
  
      if (!this.headNode.nextNode) {
        const temp = this.headNode;
        this.headNode = null;
        return temp;
      }
  
      let current = this.headNode;
      while (current.nextNode && current.nextNode.nextNode) {
        current = current.nextNode;
      }
      const temp = current.nextNode;
      current.nextNode = null;
      return temp;
    }
  
    contains(value) {
      let current = this.headNode;
      while (current) {
        if (current.value === value) return true;
        current = current.nextNode;
      }
      return false;
    }
  
    find(value) {
      let index = 0;
      let current = this.headNode;
      while (current) {
        if (current.value === value) return index;
        index++;
        current = current.nextNode;
      }
      return null;
    }
  
    toString() {
      let result = '';
      let current = this.headNode;
      while (current) {
        result += `( ${current.value} ) -> `;
        current = current.nextNode;
      }
      return result + 'null';
    }
  
    insertAt(value, index) {
      if (index === 0) {
        this.prepend(value);
        return;
      }
      const newNode = new Node(value);
      let current = this.headNode;
      let prev = null;
      let count = 0;
      while (current && count < index) {
        prev = current;
        current = current.nextNode;
        count++;
      }
      if (prev) {
        prev.nextNode = newNode;
        newNode.nextNode = current;
      }
    }
  
    removeAt(index) {
      if (index === 0 && this.headNode) {
        this.headNode = this.headNode.nextNode;
        return;
      }
      let current = this.headNode;
      let prev = null;
      let count = 0;
      while (current && count < index) {
        prev = current;
        current = current.nextNode;
        count++;
      }
      if (prev && current) {
        prev.nextNode = current.nextNode;
      }
    }
  }
  