//!добавление и обновление LocalStorage

export default function updateLocalStorage() {
  const columns = document.querySelectorAll(".column");

  const boardState = [];

  columns.forEach((column) => {
    const columnId = column.dataset.columnId;
    const columnTitle = column.querySelector("h2").textContent.trim();

    const cards = [];

    column.querySelectorAll(".card").forEach((card) => {
      const cardId = card.dataset.cardId;
      const cardContent = card.querySelector("p").textContent.trim();

      cards.push({
        id: cardId,
        content: cardContent,
      });
    });

    boardState.push({
      id: columnId,
      title: columnTitle,
      cards: cards,
    });
  });

  localStorage.setItem("boardState", JSON.stringify(boardState));
}
