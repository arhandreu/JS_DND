//!извлечение из LocalStorage

export default function restoreBoardFromLocalStorage() {
  const columnsContainer = document.querySelector(".board");

  const boardState = JSON.parse(localStorage.getItem("boardState"));
  //console.log(boardState);

  if (boardState) {
    columnsContainer.innerHTML = "";

    boardState.forEach((column) => {
      const columnId = column.id;
      const columnTitle = column.title;
      const cards = column.cards;

      const columnTemplate = `
        <div class="column" data-column-id="${columnId}">
          <h2>${columnTitle}</h2>

          <ul class="column-cards">
            ${cards
              .map(
                (card) => `
              <li class="card" draggable="true" data-card-id="${card.id}">
              <button type="button" class="delete-card-button">&#x2715;</button>
                <p class="card-text">${card.content}</p>
              </li>
            `
              )
              .join("")}
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
