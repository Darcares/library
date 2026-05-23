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

            case "status": 
                const book = library.find(element => element.id === bookID);
                book.toggleReadStatus(event);
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

    Book.prototype.toggleReadStatus = function (event) {

        this.read = !this.read;
        event.target.dataset.status = this.read === true ? "not-read": "read";
    }

    // Seed the library with sample books
    library.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
    library.push(new Book("Deep Work", "Cal Newport", 304, false));
    library.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
    library.push(new Book("1984", "George Orwell", 328, true));
    library.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
    library.push(new Book("The Catcher in the Rye", "J.D. Salinger", 277, true));
    library.push(new Book("Pride and Prejudice", "Jane Austen", 279, false));
    library.push(new Book("Brave New World", "Aldous Huxley", 268, true));
    library.push(new Book("The Alchemist", "Paulo Coelho", 208, false));
    
    printLibrary();

    function getFormData(form) {

        const bookData = new FormData(form);
        return bookData;
    }

    function createCard(book) {

        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = book.id;

        const name = document.createElement("h2");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        const status = document.createElement("button");
        const del = document.createElement("button");

        status.className = "status";
        status.dataset.status = book.read === true ? "not-read" : "read";
        del.className = "delete";

        name.textContent = `${book.name}`;
        author.setHTML(`<span>Author:</span> ${book.author}`);
        pages.setHTML(`<span>Pages:</span> ${book.pages}`);
        read.setHTML(`<span>Read?:</span> ${book.read === true ? "Yes" : "No"}`);
        status.textContent = book.read === true ? "Not read" : "Read";
        del.textContent = "Delete";

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(status);
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
