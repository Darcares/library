"use strict";

const library = [];
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookData = getFormData(form);
    const newBook = new Book(bookData.get("name"), bookData.get("author"), bookData.get("pages"), bookData.get("read") === "on" ? true : false);
    library.push(newBook);
    form.reset();
    console.log(library);
});

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function getFormData(form) {
    const bookData = new FormData(form);
    return bookData;
}