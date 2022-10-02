const books = document.querySelectorAll('.book');
const addBookBtn = document.querySelector('.add-book');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const checkBox = document.getElementById('checkbox');
const ratingOption = document.querySelector('.rating');
const rateValue = document.getElementById('rate-value');
const starContainer = document.querySelector('.stars');
const starOverlay = document.querySelector('.star-overlay')

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

books.forEach((book) => {
    book.addEventListener('click', () => {changeBookStatus(book)})
 });

 addBookBtn.addEventListener('click', showBookForm);

 rateValue.addEventListener('change', () => {
    rating(rateValue.value);
 });

 checkBox.addEventListener('click', showRatingOption);