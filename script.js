const addBookBtn = document.querySelector('.add-book');
const tbody = document.querySelector('.tbody');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const checkBox = document.getElementById('checkbox');
const ratingOption = document.querySelector('.rating');
const rateValue = document.getElementById('rate-value');
const starContainer = document.querySelector('.stars');
const starOverlay = document.querySelector('.star-overlay')
const submitBtn = document.querySelector('.submit-btn');
let myLibrary = [];

function showBookForm() {
    overlay.style.display = 'block';
    modal.classList.add('active');
    overlay.addEventListener('click', removeBookForm);
}

function removeBookForm() {
    overlay.style.display = 'none';
    modal.classList.remove('active')
}

function changeBookStatus(book) {
    if(book.getAttribute('class') === 'book read-book') {
        book.classList.remove('read-book');
        book.classList.add('not-read-book');
        book.textContent = 'Not read';
    } else if (book.getAttribute('class') === 'book not-read-book') {
        book.classList.remove('not-read-book');
        book.classList.add('read-book');
        book.textContent = 'Read';
    }
}

function showRatingOption() {
    if(checkBox.checked === true) {
        ratingOption.style.display = 'flex';
    } else if(checkBox.checked === false) {
        ratingOption.style.display = 'none';
    }
}

function rating(value) {
    const percentage = Math.round((value / 5) * 100);
    starOverlay.style.width = `${100 - percentage}%`;
}

function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
}

function getUserInput() {
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const pages = document.querySelector('.pages').value;
    const year = document.querySelector('.year').value;

    const book = new Book(title, author, pages, year);
    myLibrary.push(book);
}

function createBookStatusBtn(tr) {
    const readCell = document.createElement('td');
    const readButton = document.createElement('button');

    if(checkBox.checked) {
        readButton.classList.add('book');
        readButton.classList.add('read-book');
        readButton.textContent = 'Read';
    } else if(!checkBox.checked) {
        readButton.classList.add('book');
        readButton.classList.add('not-read-book');
        readButton.textContent = 'Not read'
    }

    readCell.appendChild(readButton);
    tr.appendChild(readCell);
}

function createStars(tr) {
    const starsCell = document.createElement('td');
    const starsContainer = document.createElement('div');
    const starsOverlay = document.createElement('div');
    const percentage = Math.round((rateValue.value / 5) * 100);

    if(checkBox.checked) {
        for(let i = 0; i < 5; i++) {
            const star = document.createElement('img');
            star.setAttribute('src', 'img/star.svg');
            starsContainer.appendChild(star);
        }
    }

    starsOverlay.style.width = `${100 - percentage}%`;
    starsOverlay.classList.add('star-overlay');
    starsContainer.classList.add('stars-container');

    starsContainer.appendChild(starsOverlay);
    starsCell.appendChild(starsContainer);
    tr.appendChild(starsCell);
}

function createDeleteBtn(tr) {
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteCell.appendChild(deleteButton);

    tr.appendChild(deleteCell);
}

function displayBook() {
    getUserInput();
    const tr = document.createElement('tr');
    myLibrary.forEach((book) => {
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const yearCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    yearCell.textContent = book.year;
    
    tr.append(titleCell, authorCell, pagesCell, yearCell);

    createBookStatusBtn(tr);
    createStars(tr);
    createDeleteBtn(tr);
    })
    tbody.appendChild(tr);

    const books = document.querySelectorAll('.book');
    books.forEach((book) => {
        book.addEventListener('click', () => {changeBookStatus(book)})
    });
}

addBookBtn.addEventListener('click', showBookForm);

checkBox.addEventListener('click', showRatingOption);

rateValue.addEventListener('change', () => {
    rating(rateValue.value);
});

submitBtn.addEventListener('click', displayBook);