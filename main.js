let buku = [];  

const formBuku = document.getElementById('bookForm');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');


function saveToLocalStorage() {
  localStorage.setItem('buku', JSON.stringify(buku));
}


function loadFromLocalStorage() {
  const storedBooks = localStorage.getItem('buku');
  if (storedBooks) {
    buku = JSON.parse(storedBooks);
  }
}


loadFromLocalStorage();

function tambahBuku(event) {
  event.preventDefault();
  
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const book = {
    id: +new Date(),
    title,
    author,
    year: Number(year),
    isComplete
  };

  buku.push(book);
  saveToLocalStorage();
  renderBooks();
  formBuku.reset();
}

function hapusBuku(bookId) {
  const bookIndex = buku.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    buku.splice(bookIndex, 1);
    saveToLocalStorage();
    renderBooks();
  }
}

function editBuku(bookId) {
  const book = buku.find(book => book.id === bookId);
  if (book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;

    hapusBuku(bookId);
  }
}

function toggleBookComplete(bookId) {
  const book = buku.find(book => book.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    saveToLocalStorage();
    renderBooks();
  }
}

function renderBooks() {
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = ''; 

  const incompleteBooks = buku.filter(book => !book.isComplete);
  const completeBooks = buku.filter(book => book.isComplete);

  if (incompleteBooks.length === 0) {
    incompleteBookList.innerHTML = '<p>Buku kosong</p>'; 
  } else {
    incompleteBooks.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book_item');
      bookElement.setAttribute('data-bookid', book.id);
      bookElement.setAttribute('data-testid', 'bookItem');

      bookElement.innerHTML = `
        <h3 data-testid="bookItemTitle" class="judul">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div> 
          <button data-testid="bookItemIsCompleteButton" class="done" onclick="toggleBookComplete(${book.id})">
            ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
          </button>
          <button data-testid="bookItemDeleteButton" class="hapus" onclick="hapusBuku(${book.id})">Hapus Buku</button>
          <button data-testid="bookItemEditButton" class="edit" onclick="editBuku(${book.id})">Edit Buku</button>
        </div>
      `;
      incompleteBookList.appendChild(bookElement);
    });
  }

  if (completeBooks.length === 0) {
    completeBookList.innerHTML = '<p>Buku kosong</p>'; 
  } else {
    completeBooks.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book_item');
      bookElement.setAttribute('data-bookid', book.id);
      bookElement.setAttribute('data-testid', 'bookItem');

      bookElement.innerHTML = `
        <h3 data-testid="bookItemTitle" class="judul">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div> 
          <button data-testid="bookItemIsCompleteButton" class="done" onclick="toggleBookComplete(${book.id})">
            ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
          </button>
          <button data-testid="bookItemDeleteButton" class="hapus" onclick="hapusBuku(${book.id})">Hapus Buku</button>
          <button data-testid="bookItemEditButton" class="edit" onclick="editBuku(${book.id})">Edit Buku</button>
        </div>
      `;
      completeBookList.appendChild(bookElement);
    });
  }
}

function searchBooks(event) {
  event.preventDefault();
  
  const query = document.getElementById('searchBookTitle').value.toLowerCase();
  
  const filteredBooks = buku.filter(book => book.title.toLowerCase().includes(query));

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  if (filteredBooks.length === 0) {
    incompleteBookList.innerHTML = '<p>Tidak ada buku yang ditemukan</p>';
  } else {
    filteredBooks.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book_item');
      bookElement.setAttribute('data-bookid', book.id);

      bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div>
          <button class="done" onclick="toggleBookComplete(${book.id})">
            ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
          </button>
          <button class="edit" onclick="editBuku(${book.id})">Edit Buku</button>
          <button class="hapus" onclick="hapusBuku(${book.id})">Hapus Buku</button>
        </div>
      `;

      if (book.isComplete) {
        completeBookList.appendChild(bookElement);
      } else {
        incompleteBookList.appendChild(bookElement);
      }
    });
  }
}

formBuku.addEventListener('submit', tambahBuku);
document.getElementById('searchBook').addEventListener('submit', searchBooks);

renderBooks();
