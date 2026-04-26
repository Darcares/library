"use strict";

const library = [];
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookData = getFormData(form);
    const newBook = new Book(bookData.get("name"), bookData.get("author"), bookData.get("pages"), bookData.get("read") === "on" ? true : false);
    addBookToLibrary(newBook);
    cleanForm();
    console.log(library);
});

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary (book) {
    const id = crypto.randomUUID()
    book.id = id;
    library.push(book);
}

function getFormData(form) {
    const bookData = new FormData(form);
    return bookData;
}

function cleanForm() {
  const name = document.querySelector("#name");  
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  name.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}