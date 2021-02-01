'use strict'

var gBooks;
var gSortBy = {
    sortBy: 'title',
    isReverse: false
};
const KEY = 'books';
const PAGES = 3;
var gPageIdx = 0;

_createBooks();

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length)
        books = [
            {
                id: makeId(),
                name: 'The queen`s gambit',
                price: getRandomIntInclusive(50, 100),
                rate: 0,
                description: makeLorem(100),
                imgURL: 'img/gambit.jpg'
            },
            {
                id: makeId(),
                name: 'The survivor',
                price: getRandomIntInclusive(50, 100),
                rate: 0,
                description: makeLorem(50),
                imgURL: 'img/survivors.jpg'
            },
            {
                id: makeId(),
                name: 'We were liars',
                price: getRandomIntInclusive(50, 100),
                rate: 0,
                description: makeLorem(50),
                imgURL: 'img/liars.jpg'
            }
        ];
    gBooks = books;
    _saveBooksToStorage();
}
function nextPage(){
    gPageIdx++;
    console.log('gPageIdx:', gPageIdx)
    if(gPageIdx*PAGES>=gBooks.length){
        gPageIdx--;
    }
    console.log('gPageIdx:', gPageIdx)
}
function prevPage(){
    gPageIdx--;
    console.log('gPageIdx:', gPageIdx)
    if(gPageIdx*PAGES<0){
        gPageIdx++;
    }
}
function getBooks() {
    if (gSortBy.sortBy === 'title') {
        gBooks.sort(function (a, b) {
            var bookA = a.name.toLowerCase();
            var bookB = b.name.toLowerCase();
            if (gSortBy.isReverse) return (bookA < bookB) ? 1 : (bookA > bookB) ? -1 : 0;
            return (bookA < bookB) ? -1 : (bookA > bookB) ? 1 : 0;
        });
    }
    else if (gSortBy.sortBy === 'id') {
        gBooks.sort(function (a, b) {
            if (gSortBy.isReverse) return b.id - a.id;
            return a.id - b.id;
        })
    }
    else if (gSortBy.sortBy === 'price') {
        gBooks.sort(function (a, b) {
            if (gSortBy.isReverse) return b.price - a.price;
            return a.price - b.price;
        })

    }
    else if (gSortBy.sortBy === 'rate') {
        gBooks.sort(function (a, b) {
            if (gSortBy.isReverse) return b.rate - a.rate;
            return a.rate - b.rate;
        })
    }
    var startIdx=gPageIdx*PAGES;
    return gBooks.slice(startIdx, startIdx + PAGES);
}
function getBookByID(bookID) {
    var book = gBooks.find(function (book) {
        return book.id === bookID;
    });
    return book;
}

function deleteBook(bookID) {
    var bookIDX = gBooks.findIndex(function (book) {
        return book.id === bookID;
    });
    gBooks.splice(bookIDX, 1);
    _saveBooksToStorage();
}

function addBook(bookName, price) {
    gBooks.push(
        {
            id: makeId(),
            name: bookName,
            price: price,
            rate: 0,
            description: makeLorem(50),
            imgURL:getRandomImg()
        }
    );
    _saveBooksToStorage();
}
function updateBook(bookID, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookID;
    });
    book.price = newPrice;
    _saveBooksToStorage();
}
function updateRate(bookID, rate) {
    var book = gBooks.find(function (book) {
        return book.id === bookID;
    });
    book.rate = rate;
    _saveBooksToStorage();
}

function sortBy(sortBy) {
    if (gSortBy.sortBy === sortBy) {
        gSortBy.isReverse = !gSortBy.isReverse;
    }
    else {
        gSortBy.sortBy = sortBy;
        gSortBy.isReverse = false;
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}