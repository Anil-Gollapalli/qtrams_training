// LinkedList and Node class
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add a node to the end of the list
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    // Add a node to the start of the list
    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    // Remove the last node from the list
    pop() {
        if (!this.head) return;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let current = this.head;
            while (current.next !== this.tail) {
                current = current.next;
            }
            current.next = null;
            this.tail = current;
        }
        this.size--;
    }

    // Find node by value
    find(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1; 
    }

    // Insert a node at a given index
    insertAt(value, index) {
        if (index > 0 && index > this.size) return; 
        const newNode = new Node(value);
        let current = this.head;

        if (index === 0) { 
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let count = 0;
            while (count < index - 1) { 
                current = current.next;
                count++;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        this.size++;
    }

    // Remove node at a given index
    removeAt(index) {
        if (index > 0 && index > this.size) return;
        let current = this.head;

        if (index === 0) { 
            this.head = current.next;
        } else {
            let count = 0;
            let previous;
            while (count < index) { 
                previous = current;
                current = current.next;
                count++;
            }
            previous.next = current.next;
        }
        this.size--;
    }

    // Represent the Linked List as a string
    toString() {
        if (!this.head) return '( LinkedList is empty )';
        let current = this.head;
        let result = '';
        while (current) {
            result += `( ${current.value} ) -> `;
            current = current.next;
        }
        result += 'null';
        return result;
    }
}

// Initializing LinkedList
const list = new LinkedList();

// DOM elements
const inputField = document.getElementById('inputField');
const appendBtn = document.getElementById('appendBtn');
const prependBtn = document.getElementById('prependBtn');
const popBtn = document.getElementById('popBtn');
const findBtn = document.getElementById('findBtn');
const insertBtn = document.getElementById('insertBtn');
const removeBtn = document.getElementById('removeBtn');
const resultContainer = document.getElementById('result');

// Update the UI with the current linked list
function updateUI() {
    resultContainer.textContent = list.toString();
}

// Event listeners for buttons
appendBtn.addEventListener('click', () => {
    const value = inputField.value;
    if (value) {
        list.append(value);
        inputField.value = '';
        updateUI();
    }
});

prependBtn.addEventListener('click', () => {
    const value = inputField.value;
    if (value) {
        list.prepend(value);
        inputField.value = '';
        updateUI();
    }
});

popBtn.addEventListener('click', () => {
    list.pop();
    updateUI();
});

findBtn.addEventListener('click', () => {
    const value = inputField.value;
    const index = list.find(value);
    if (index !== -1) {
        resultContainer.textContent = `Node with value "${value}" found at index ${index}`;
    } else {
        resultContainer.textContent = `Node with value "${value}" not found`;
    }
});

insertBtn.addEventListener('click', () => {
    const value = inputField.value;
    const index = parseInt(prompt("Enter index to insert at:"));
    if (value && !isNaN(index)) {
        list.insertAt(value, index);
        inputField.value = '';
        updateUI();
    }
});

removeBtn.addEventListener('click', () => {
    const index = parseInt(prompt("Enter index to remove from:"));
    if (!isNaN(index)) {
        list.removeAt(index);
        updateUI();
    }
});
