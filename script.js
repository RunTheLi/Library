// --- Book Class ---
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// --- Library Class ---
class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    this.updateLibraryDisplay();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.updateLibraryDisplay();
  }

  toggleReadStatus(index) {
    this.books[index].toggleReadStatus();
    this.updateLibraryDisplay();
  }

  updateLibraryDisplay() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookCard = this.createBookCard(book, index);
      libraryContainer.appendChild(bookCard);
    });
  }

  createBookCard(book, index) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">Toggle Read</button>
    `;

    card.querySelector('.remove-btn').onclick = () => this.removeBook(index);
    card.querySelector('.toggle-read-btn').onclick = () => this.toggleReadStatus(index);

    return card;
  }
}

// --- Instantiate the Library ---
const library = new Library();

// --- Utility Functions ---
function openNewBookForm() {
  document.getElementById('new-book-dialog').showModal();
}

function closeNewBookForm() {
  document.getElementById('new-book-dialog').close();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  library.addBook(title, author, pages, read);
  closeNewBookForm();
}

// --- Event Listeners ---
document.getElementById('new-book-btn').onclick = openNewBookForm;
document.getElementById('close-dialog').onclick = closeNewBookForm;
document.getElementById('new-book-form').onsubmit = handleFormSubmit;
