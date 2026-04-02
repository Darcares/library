"use strict";

const library = [];

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