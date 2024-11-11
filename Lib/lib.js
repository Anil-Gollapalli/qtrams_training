// Array to store all books
const myLibrary = [];

// Book constructor
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    // Method to toggle read status
    toggleReadStatus() {
        this.isRead = !this.isRead;
    }
}

// Function to add new book to library
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks(); // Refresh display when adding new book
}

// Function to remove book from library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(); // Refresh display after removal
}

// Function to display all books
function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Clear current display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? 'Read' : 'Not Read'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleRead(${index})">Toggle Read Status</button>
        `;

        libraryContainer.appendChild(bookCard);
    });
}

// Function to toggle read status
function toggleRead(index) {
    myLibrary[index].toggleReadStatus();
    displayBooks(); // Refresh display after status change
}

// Function to handle new book form submission
function handleNewBookSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    addBookToLibrary(title, author, pages, isRead);

    // Reset form
    event.target.reset();
}

// Event listener to display books when content loads
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    // Add form submit event listener
    const newBookForm = document.getElementById('new-book-form');
    if (newBookForm) {
        newBookForm.addEventListener('submit', handleNewBookSubmit);
    }
});
