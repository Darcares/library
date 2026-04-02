"use strict";

const library = [];
const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    getFormData(form);
});

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary (book) {
    const bookID = crypto.randomUUID()
    book.ID = bookID;
    library.push(book);
}

function getFormData(form) {
   /* const data = new FormData(form);*/
    
    console.log("getting data");
}
