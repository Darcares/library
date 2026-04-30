"use strict";

const library = [];
const form = document.querySelector("#form");
const container = document.querySelector(".container");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookData = getFormData(form);
    const newBook = new Book(bookData.get("name"), bookData.get("author"), bookData.get("pages"), bookData.get("read") === "on" ? true : false);
    library.push(newBook);
    printLibrary();
    form.reset();
});

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function getFormData(form) {
    const bookData = new FormData(form);
    return bookData;
}

function printLibrary() {

    container.innerHTML = "";

    library.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";

        const name = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        const toggle = document.createElement("button");
        const del = document.createElement("button");

        name.textContent = `Name: ${book.name}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        read.textContent = `Read?: ${book.read === true ? "Yes" : "No"}`;
        toggle.textContent = book.read === true ? "Not read" : "Read";
        del.textContent = "Delete";

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(toggle);
        card.appendChild(del);

        container.appendChild(card);

        toggle.addEventListener("click", (event) => {
            book.toggleReadStatus();
            printLibrary();
        });

        del.addEventListener("click", (event) => {
            const compareIDs = (element) => element.id === book.id;
            const indexToErase = library.findIndex(compareIDs);
            library.splice(indexToErase, 1);
            printLibrary();
        });
    });   
}   