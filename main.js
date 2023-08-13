/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/getRandomId.js
//!функция для создания рандомного id карточки

function getRandomId() {
  return Math.floor(Math.random() * 1000000);
}
;// CONCATENATED MODULE: ./src/js/updateLocalStorage.js
//!добавление и обновление LocalStorage

function updateLocalStorage() {
  const columns = document.querySelectorAll(".column");
  const boardState = [];
  columns.forEach(column => {
    const columnId = column.dataset.columnId;
    const columnTitle = column.querySelector("h2").textContent.trim();
    const cards = [];
    column.querySelectorAll(".card").forEach(card => {
      const cardId = card.dataset.cardId;
      const cardContent = card.querySelector("p").textContent.trim();
      cards.push({
        id: cardId,
        content: cardContent
      });
    });
    boardState.push({
      id: columnId,
      title: columnTitle,
      cards: cards
    });
  });
  localStorage.setItem("boardState", JSON.stringify(boardState));
}
;// CONCATENATED MODULE: ./src/js/restoreBoardFromLocalStorage.js
//!извлечение из LocalStorage

function restoreBoardFromLocalStorage() {
  const columnsContainer = document.querySelector(".board");
  const boardState = JSON.parse(localStorage.getItem("boardState"));
  //console.log(boardState);

  if (boardState) {
    columnsContainer.innerHTML = "";
    boardState.forEach(column => {
      const columnId = column.id;
      const columnTitle = column.title;
      const cards = column.cards;
      const columnTemplate = `
        <div class="column" data-column-id="${columnId}">
          <h2>${columnTitle}</h2>

          <ul class="column-cards">
            ${cards.map(card => `
              <li class="card" draggable="true" data-card-id="${card.id}">
              <button type="button" class="delete-card-button">&#x2715;</button>
                <p class="card-text">${card.content}</p>
              </li>
            `).join("")}
          </ul>

          <a class="add-card-link">+ Add another card</a>

          <div class="add-card-section visually-hidden">
            <textarea class="textarea"></textarea>
    
            <button type="button" class="add-card-button">Add Card</button>
            <button type="button" class="cancel-card-button"></button>
          </div>
        </div>
      `;
      columnsContainer.insertAdjacentHTML("beforeend", columnTemplate);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/insertAboveTask.js
//!функция для определения позиции перетаскивания карточки

function insertAboveTask(zone, mouseY) {
  const notActualElements = zone.querySelectorAll(".card:not(.is-dragging)");
  //console.log(notActualElements);

  let closestCard = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  notActualElements.forEach(elem => {
    const {
      top
    } = elem.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestCard = elem;
    }
  });
  return closestCard;
}
;// CONCATENATED MODULE: ./src/js/app.js




window.onload = function () {
  restoreBoardFromLocalStorage();
};
const columnsContainer = document.querySelector(".board");
columnsContainer.addEventListener("click", e => {
  //e.target - это конкретно тот элемент, на который мы кликнули
  const clickTarget = e.target;
  //console.log(clickTarget);

  //!добавление новой карточки
  const column = clickTarget.closest(".column");
  const addCardLink = column.querySelector(".add-card-link");
  const columnCardsList = column.querySelector(".column-cards");
  const addCardSection = column.querySelector(".add-card-section");
  const textarea = column.querySelector(".textarea");
  const addCardButton = column.querySelector(".add-card-button");
  const cancelCardButton = column.querySelector(".cancel-card-button");
  if (clickTarget === addCardLink) {
    addCardSection.classList.remove("visually-hidden");
    addCardButton.addEventListener("click", () => {
      const cardContent = textarea.value.trim();
      if (cardContent) {
        const cardId = getRandomId();
        const cardTemplate = `
            <div class="card" draggable="true" data-card-id="${cardId}">
            <button type="button" class="delete-card-button">&#x2715;</button>
              <p class="card-text">${cardContent}</p>
            </div>
          `;
        columnCardsList.insertAdjacentHTML("beforeend", cardTemplate);
        updateLocalStorage();
        textarea.value = "";
        addCardSection.classList.add("visually-hidden");
      }
    });
    cancelCardButton.addEventListener("click", () => {
      textarea.value = "";
      addCardSection.classList.add("visually-hidden");
    });
  }

  //!удаление карточки
  const deleteCardButtons = column.querySelectorAll(".delete-card-button");
  deleteCardButtons.forEach(button => {
    if (clickTarget === button) {
      const card = button.closest(".card");
      card.remove();
      updateLocalStorage();
    }
  });
});

//!перетаскивание карточек
let actualElement;
const body = document.querySelector('body');
columnsContainer.addEventListener("dragstart", e => {
  actualElement = e.target;
  //console.log(actualElement);

  actualElement.classList.add("is-dragging");

  // Устанавливаем курсор в режим "grabbing" во время перетаскивания
  //actualElement.style.cursor = "grabbing";
  //body.style.cursor = "grabbing";

  const droppables = document.querySelectorAll(".column-cards");
  //console.log(droppables);

  droppables.forEach(zone => {
    zone.addEventListener("dragover", e => {
      //console.log(e);
      e.preventDefault();
      const bottomCard = insertAboveTask(zone, e.clientY);
      //console.log(bottomCard);
      const curCard = document.querySelector(".is-dragging");
      if (!bottomCard) {
        zone.appendChild(curCard);
      } else {
        zone.insertBefore(curCard, bottomCard);
      }
      updateLocalStorage();
    });
  });
});
columnsContainer.addEventListener("dragend", () => {
  actualElement.classList.remove("is-dragging");

  // Возвращаем курсор в режим "grab" после окончания перетаскивания
  //actualElement.style.cursor = "grab";
  //body.style.cursor = "grab";
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;