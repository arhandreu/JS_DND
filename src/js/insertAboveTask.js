//!функция для определения позиции перетаскивания карточки

export default function insertAboveTask(zone, mouseY) {
  const notActualElements = zone.querySelectorAll(".card:not(.is-dragging)");
  //console.log(notActualElements);

  let closestCard = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  notActualElements.forEach((elem) => {
    const { top } = elem.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestCard = elem;
    }
  });

  return closestCard;
}
