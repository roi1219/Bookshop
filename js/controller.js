'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td>${book.rate}</td>
        <td><button class="read" onclick="onRead('${book.id}')">Read</button></td>
        <td><button class="update" onclick="onUpdate('${book.id}')">Update</button></td>
        <td><button class="delete" onclick="onDelete('${book.id}')">Delete</button></td>
        </tr>`
    }).join('');
    var elTable = document.querySelector('tbody');
    elTable.innerHTML = strHTML;
}

function onDelete(bookID) {
    deleteBook(bookID);
    renderBooks();
}

function onLoadForm() {
    var elForm = document.querySelector('form');
    elForm.style.display = 'flex';
}

function onAddBook(ev) {
    ev.preventDefault();
    var bookName = document.querySelector('input[name=bookName]').value;
    document.querySelector('input[name=bookName]').value='';
    var price = document.querySelector('input[name=price]').value;
    document.querySelector('input[name=price]').value='';
    addBook(bookName, price);
    var elForm = document.querySelector('form');
    elForm.style.display = 'none';
    renderBooks();
}

function onCloseForm(){
    var elForm = document.querySelector('form');
    elForm.style.display = 'none';
}

function onUpdate(bookID) {
    var newPrice = +prompt('new price?');
    updateBook(bookID, newPrice);
    renderBooks();
}

function onRead(bookID) {
    var book = getBookByID(bookID);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h4').innerText = book.price + '$';
    elModal.querySelector('p').innerText = book.description;
    elModal.innerHTML += `<button onClick="onRate('${bookID}')">rate</button>`
    elModal.querySelector('img').src = book.imgURL;
    elModal.style.display = 'flex';
}
function onCloseModal() {
    console.log('hi');
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    elModal.innerHTML = `<h3></h3>
    <h4></h4>
    <img src="">
    <p class="description"></p>
    <button onclick="onCloseModal()">Close book info</button>
    Rate the book:<input type="number" placeholder="rate" name="rate" min="0" max="10"/>
    <div class="buttons">
    <button onclick="raiseRate()">+</button>
    <button onclick="decreseRate()">-</button>
    </div>`
}

function onRate(bookID) {
    var rate = document.querySelector('input[name=rate]').value;
    if (!rate) rate = 0;
    updateRate(bookID, rate);
    onCloseModal();
    renderBooks();
}

function decreseRate() {
    var elRate=document.querySelector('input[name=rate]').value;
    if(elRate>0){
        document.querySelector('input[name=rate]').value--;
    }
}
function raiseRate() {
    var elRate=document.querySelector('input[name=rate]').value;
    if(elRate<10){
        document.querySelector('input[name=rate]').value++;
    }
}

function onSortBy(type) {
    sortBy(type);
    renderBooks();
}

function onNextPage(){
    nextPage();
    var elPage=document.querySelector('.page');
    elPage.innerText=(gPageIdx+1)+'/'+Math.ceil(gBooks.length/3);
    renderBooks();
}

function onPrevPage(){
    prevPage();
    var elPage=document.querySelector('.page');
    elPage.innerText=(gPageIdx+1)+'/'+Math.ceil(gBooks.length/3);
    renderBooks();
}

