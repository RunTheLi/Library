const myLibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libraryContainer.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
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

  // Add event listeners for the buttons
  card.querySelector('.remove-btn').onclick = () => removeBook(index);
  card.querySelector('.toggle-read-btn').onclick = () => toggleReadStatus(index);

  return card;
}

// Remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  updateLibraryDisplay();
}

// Toggle the read status of a book
function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  updateLibraryDisplay();
}

// Open the new book form
function openNewBookForm() {
  document.getElementById('new-book-dialog').showModal();
}

// Close the new book form
function closeNewBookForm() {
  document.getElementById('new-book-dialog').close();
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  closeNewBookForm();
}

// Add event listeners
document.getElementById('new-book-btn').onclick = openNewBookForm;
document.getElementById('close-dialog').onclick = closeNewBookForm;
document.getElementById('new-book-form').onsubmit = handleFormSubmit;
