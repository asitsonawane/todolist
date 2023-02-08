const titleInput = document.getElementById('title-input');
const createCardButton = document.getElementById('create-card');
const cardContainer = document.querySelector('.card-container');

createCardButton.addEventListener('click', function () {
  createCard(titleInput.value);
  titleInput.value = '';
});

titleInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    createCard(titleInput.value);
    titleInput.value = '';
  }
});

function createCard(title) {
  if (!title) return;

  const card = document.createElement('div');
  card.classList.add('card');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.innerHTML = `
    <div>${title}</div>
    <button class="delete-card">&times;</button>
  `;
  card.appendChild(cardHeader);

  const listInput = document.createElement('input');
  listInput.setAttribute('type', 'text');
  listInput.setAttribute('placeholder', 'Enter item');
  listInput.classList.add('list-input');
  card.appendChild(listInput);

  const cardList = document.createElement('ul');
  cardList.classList.add('card-list');
  card.appendChild(cardList);

  listInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      createListItem(cardList, listInput.value);
      listInput.value = '';
    }
  });

  cardHeader.querySelector('.delete-card').addEventListener('click', function () {
    card.remove();
  });

  cardContainer.appendChild(card);
}

function createListItem(cardList, text) {
  if (!text) return;

  const listItem = document.createElement('li');
  listItem.classList.add('list-item');
  listItem.innerHTML = `
    <div>${text}</div>
    <div class="date">${new Date().toLocaleDateString()}</div>
  `;
  cardList.appendChild(listItem);

  listItem.addEventListener('click', function () {
    listItem.classList.toggle('strike-through');
  });

  listItem.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    listItem.remove();
  });
}

function changeHeaderColor(card, color) {
  card.querySelector('.card-header').style.backgroundColor = color;
}