"use strict";

initialize();

function initialize() {
    const library = [];
    const form = document.querySelector("#form");
    const container = document.querySelector(".container");

    form.addEventListener("submit", (event) => {

        event.preventDefault();
        const bookData = getFormData(form);
        const newBook = new Book(
            bookData.get("name"),
            bookData.get("author"),
            bookData.get("pages"),
            bookData.get("read") === "on" ? true : false,
        );
        library.push(newBook);
        printLibrary();
        form.reset();
    });

    container.addEventListener("click", (event) => {

        const buttonClass = event.target.className;
        const bookID = event.target.closest(".card").dataset.id;

        switch(buttonClass) {

            case "toggle": 
                const book = library.find(element => element.id === bookID);
                book.toggleReadStatus();
                printLibrary();
                break;

            case "delete":
                const bookIndex = library.findIndex(element => element.id === bookID);
                library.splice(bookIndex, 1);
                printLibrary();
                break;

            default:
                console.log("Error, no case");
                break;
        }
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

    // Seed the library with sample books
    library.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
    library.push(new Book("Deep Work", "Cal Newport", 304, false));
    library.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
    
    printLibrary();

    function getFormData(form) {

        const bookData = new FormData(form);
        return bookData;
    }

    function createCard(book) {

        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = book.id;

        const name = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        const toggle = document.createElement("button");
        const del = document.createElement("button");

        toggle.className = "toggle";
        del.className = "delete";

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
    }

    function printLibrary() {

        container.innerHTML = "";

        library.forEach(book => {
            createCard(book);
        });   
    }   
}
