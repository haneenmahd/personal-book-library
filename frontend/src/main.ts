import "./style.css";

import WebService from "./http/WebService";
import { Book } from "./types/Book";

const publishBook = document.querySelector<HTMLButtonElement>("#publish-book")!;
const modal = document.querySelector<HTMLDivElement>("#modal")!;
const newBook = document.querySelector<HTMLButtonElement>("#new-book")!;
const bookTitle = document.querySelector<HTMLInputElement>("#book-title")!;
const bookDescription =
  document.querySelector<HTMLTextAreaElement>("#book-description")!;
const bookAuthor = document.querySelector<HTMLInputElement>("#book-author")!;
const booksCount = document.querySelector<HTMLSpanElement>("#book-count")!;
const booksList = document.querySelector<HTMLDivElement>("#books-list")!;
const clearBooksBtn =
  document.querySelector<HTMLButtonElement>("#clear-books")!;
const bookInfoModal = document.getElementById("book-info-modal")!;
const bookInfoModalTitle = document.getElementById("book-info-modal-title")!;
const bookInfoModalDescription = document.getElementById(
  "book-info-modal-description"
)!;
const bookInfoModalAuthor = document.getElementById("book-info-modal-author")!;

const searchBookInput =
  document.querySelector<HTMLInputElement>("#search-book-input")!;

searchBookInput.addEventListener("change", (e) => {
  loadBooks((e.target as HTMLInputElement).value);
});

newBook.onclick = () => {
  modal.classList.add("visible");
};

window.onkeydown = (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("visible");
    bookInfoModal.classList.remove("visible");
  }
};

publishBook.onclick = async () => {
  await fetch("http://localhost:3001/api/create", {
    method: "POST",
    body: JSON.stringify({
      title: bookTitle.value,
      description: bookDescription.value,
      author: bookAuthor.value,
      dueDate: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  loadBooks();

  modal.classList.remove("visible");
};

function loadBooks(filter?: string) {
  booksList.innerHTML = "";

  if (!filter) {
    WebService.shared.getBooks().then((data) => {
      data.map((book) => {
        const listElement = document.createElement("li");

        listElement.onclick = () => {
          openInfoModal(book);
        };

        listElement.innerHTML = `
              <h3>${book.title}</h3>
              <span>${book.author}</span>`;

        booksList.appendChild(listElement);
      });

      booksCount.innerText = data.length.toString();
    });
  } else {
    WebService.shared.searchForBooks(filter).then((data) => {
      data.map((book) => {
        const listElement = document.createElement("li");

        listElement.onclick = () => {
          openInfoModal(book);
        };

        listElement.innerHTML = `
              <h3>${book.title}</h3>
              <span>${book.author}</span>`;

        booksList.appendChild(listElement);
      });

      booksCount.innerText = data.length.toString();
    });
  }
}

clearBooksBtn.onclick = () => {
  WebService.shared.deleteAllBooks();

  loadBooks();
};

window.onload = () => {
  loadBooks();
};

function openInfoModal(book: Book) {
  bookInfoModalTitle.innerText = book.title;
  bookInfoModalDescription.innerText = book.description;
  bookInfoModalAuthor.innerText = book.author;

  bookInfoModal.classList.add("visible");
}
