//!функция для создания рандомного id карточки

export default function getRandomId() {
  return Math.floor(Math.random() * 1000000);
}
