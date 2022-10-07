const addBookBtn = document.querySelector('.add-book');
const tbody = document.querySelector('.tbody');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const checkBox = document.getElementById('checkbox');
const ratingOption = document.querySelector('.rating');
const rateValue = document.getElementById('rate-value');
const starOverlay = document.querySelector('.star-overlay')
const submitBtn = document.querySelector('.submit-btn');
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const inputPages = document.querySelector('.pages');
const inputYear = document.querySelector('.year');
let myLibrary = [];
let index = 0;
let starsIndex = 0;
let bookStatusIndex = 0;

function showBookForm() {
    overlay.style.display = 'block';
    modal.classList.add('active');
    overlay.addEventListener('click', removeBookForm);
}

function removeBookForm() {
    overlay.style.display = 'none';
    modal.classList.remove('active');
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputYear.value = '';
    checkBox.checked = false;
    showRatingOption();
    starOverlay.style.width = '32%'
    rateValue.value = 3.4;
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

//When checkbox of read/not read book is checked, shows option
//to choose stars for rating
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

function Book(title, author, pages, year, isRead, rateStars) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.isRead = isRead;
    this.rateStars = rateStars
}

function getUserInput() {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const year = inputYear.value;
    const isRead = checkBox.checked;
    const stars = rateValue.value;

    const book = new Book(title, author, pages, year, isRead, stars);
    myLibrary.push(book);
}

function createBookStatusBtn(tr, isRead) {
    const readCell = document.createElement('td');
    const readButton = document.createElement('button');
    readButton.setAttribute('data-readButton-index', `${bookStatusIndex++}`)

    if(isRead) {
        readButton.classList.add('book');
        readButton.classList.add('read-book');
        readButton.textContent = 'Read';
    } else if(!isRead) {
        readButton.classList.add('book');
        readButton.classList.add('not-read-book');
        readButton.textContent = 'Not read'
    }

    readCell.appendChild(readButton);
    tr.appendChild(readCell);
}

function createStars(tr, isRead, rateValue) {
    const starsCell = document.createElement('td');
    const starsContainer = document.createElement('div');
    const starsOverlay = document.createElement('div');
    const percentage = Math.round((rateValue / 5) * 100);

    if(isRead) {
        for(let i = 0; i < 5; i++) {
            const star = document.createElement('img');
            star.setAttribute('src', 'img/star.svg');
            starsContainer.appendChild(star);
        }
    }

    starsContainer.setAttribute('data-star-index', `${starsIndex++}`);
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

    //The data-index-number attribute is set on button to find Book index in array, 
    //that will determine what Book object has to be deleted from myLibrary array.
    deleteButton.setAttribute('data-index-number', `${index++}`);
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteCell.appendChild(deleteButton);

    tr.appendChild(deleteCell);
}

function displayBook() {
    submitBtn.addEventListener('click', getUserInput);
    //Deletes every single book and it's details from display NOT FROM myLibrary
    document.querySelectorAll('.book-row').forEach((book) => book.remove());
    //3 book where created after page load, so right now the index = 2,
    //when we create another book it's index = 6, because the code creates
    //3 books that are written in the code + book that user created. As we use
    //index variable for deleting Book object from array we need this line of
    //code to start counting from 0
    index = 0;

    myLibrary.forEach((book) => {
    const tr = document.createElement('tr');
    tr.classList.add('book-row');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const yearCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    yearCell.textContent = book.year;
    
    tr.append(titleCell, authorCell, pagesCell, yearCell);
    createBookStatusBtn(tr, book.isRead);
    createStars(tr, book.isRead,book.rateStars);
    createDeleteBtn(tr);
    tbody.appendChild(tr);
    })

    const books = document.querySelectorAll('.book');
    books.forEach((book) => {
        book.addEventListener('click', () => {
            changeBookStatus(book);
            if(book.textContent === 'Not read') {
                deleteStars(book);
            }
        });
    });

    deleteBook();
}

function deleteStars(book) {
    const starsContainers = document.querySelectorAll('.stars-container');
    const readBookBtnIndex = book.getAttribute('data-readButton-index');

    starsContainers.forEach((container) => {
        const starsContainerIndex = container.getAttribute('data-star-index');
        if(readBookBtnIndex === starsContainerIndex) {
                container.replaceChildren();
        }
    });
}

function deleteBook() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
            //Previously each button was given an index. That index corresponds
            //with the Book index in the array. Now button index is used to
            //find Book under the same index and delete it from myLibrary array
            const buttonIndex = deleteButton.getAttribute('data-index-number');
            myLibrary.splice(buttonIndex, 1);
            displayBook();
        })
    });
}

const thinkLikeAProgrammer = new Book('Think like a programmer', 'V. Anton Spraul', 256, 2012, true, 2.8);
const fightClub = new Book('Fight Club', 'Chuck Palaniuk', 224, 1996, true, 4.6);
const elonMusk = new Book('Elon Musk', 'Ashlee Vance', 416, 2017, false);
myLibrary.push(thinkLikeAProgrammer, fightClub, elonMusk);
// displayBook() is called to display books above on page load
displayBook();

addBookBtn.onclick = () => showBookForm();
checkBox.onclick = () => showRatingOption();
rateValue.addEventListener('change', () => {
    rating(rateValue.value);
});
submitBtn.addEventListener('click', () => {
    removeBookForm();
    displayBook();
});