let books = JSON.parse(localStorage.getItem('books')) || [];
let currentId = null;

// DOM Elements
const bookForm = document.getElementById('bookForm');
const searchInput = document.getElementById('search');
const filterGenre = document.getElementById('filterGenre');
const sortBy = document.getElementById('sortBy');
const clearAllBtn = document.getElementById('clearAll');
const bookList = document.getElementById('bookList');
const totalBooks = document.getElementById('totalBooks');
const totalPages = document.getElementById('totalPages');
const avgRating = document.getElementById('avgRating');
const genreStats = document.getElementById('genreStats');

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    updateGenreFilter();
    updateStats();
});

// Event Listeners
bookForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', renderBooks);
filterGenre.addEventListener('change', renderBooks);
sortBy.addEventListener('change', renderBooks);
clearAllBtn.addEventListener('click', clearAll);

function handleFormSubmit(e) {
    e.preventDefault();
    const book = {
        id: currentId || Date.now().toString(),
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        pages: parseInt(document.getElementById('pages').value, 10),
        rating: parseInt(document.getElementById('rating').value, 10)
    };

    if (!book.title || !book.author || !book.genre || isNaN(book.pages) || isNaN(book.rating)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const index = books.findIndex(b => b.id === book.id);
    if (index > -1) {
        books[index] = book;
    } else {
        books.push(book);
    }

    saveBooks();
    resetForm();
    updateGenreFilter();
    renderBooks();
    updateStats();
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = filterGenre.value;
    const sortField = sortBy.value;

    let filtered = books.filter(({ title, author, genre }) => {
        return (
            (title.toLowerCase().includes(searchTerm) || 
             author.toLowerCase().includes(searchTerm)) &&
            (!selectedGenre || genre === selectedGenre)
        );
    });

    filtered.sort((a, b) => (sortField === 'pages' || sortField === 'rating')
        ? b[sortField] - a[sortField]
        : a[sortField].localeCompare(b[sortField]));

    bookList.innerHTML = filtered.map(({ id, title, author, genre, pages, rating }) => `
        <div class="book-card">
            <h3>${title} (${rating}★)</h3>
            <p>Author: ${author}</p>
            <p>Genre: ${genre}</p>
            <p>Pages: ${pages}</p>
            <button onclick="editBook('${id}')">Edit</button>
            <button onclick="deleteBook('${id}')">Delete</button>
        </div>
    `).join('');
}

function editBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        currentId = id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('genre').value = book.genre;
        document.getElementById('pages').value = book.pages;
        document.getElementById('rating').value = book.rating;
    }
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveBooks();
    renderBooks();
    updateStats();
}

function clearAll() {
    if (confirm('Are you sure you want to delete all books?')) {
        books = [];
        saveBooks();
        renderBooks();
        updateStats();
    }
}

function updateGenreFilter() {
    const genres = [...new Set(books.map(book => book.genre))];
    filterGenre.innerHTML = '<option value="">All Genres</option>' + 
        genres.map(genre => `<option>${genre}</option>`).join('');
}

function updateStats() {
    totalBooks.textContent = books.length;
    totalPages.textContent = books.reduce((acc, { pages }) => acc + pages, 0);
    avgRating.textContent = books.length 
        ? (books.reduce((acc, { rating }) => acc + rating, 0) / books.length).toFixed(1) 
        : 0;
    
    const genreCount = books.reduce((acc, { genre }) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});
    
    genreStats.innerHTML = Object.entries(genreCount)
        .map(([genre, count]) => `<p>${genre}: ${count}</p>`).join('');
}

function resetForm() {
    currentId = null;
    bookForm.reset();
}

// Expose functions to global scope for HTML onclick handlers
window.editBook = editBook;
window.deleteBook = deleteBook;
