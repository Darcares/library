"use strict";

const library = [];
const form = document.querySelector("#form");
const container = document.querySelector(".container");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookData = getFormData(form);
    const newBook = new Book(bookData.get("name"), bookData.get("author"), bookData.get("pages"), bookData.get("read") === "on" ? true : false);
    library.push(newBook);
    cleanScreen();
    printLibrary(library);
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

function printLibrary(library) {

    library.forEach(book => {
    
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const toogle = document.createElement("button");
    const del = document.createElement("button");

    name.innerText = book.name;
    author.innerText = book.author;
    pages.innerText = book.pages;
    read.innerText = book.read;
    toogle.innerText = book.read === true ? "Not read" : "Read";
    del.innerText = "Delete";

    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(toogle);
    card.appendChild(del);

    container.appendChild(card);
    });
}

function cleanScreen() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => container.removeChild(card));
}