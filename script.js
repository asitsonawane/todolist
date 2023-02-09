const titleInput = document.getElementById('title-input');
const createCardButton = document.getElementById('create-card');
createCardButton.style.transition = 'background-color 0.2s ease-out';
createCardButton.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#3e8e41';
});
createCardButton.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#4CAF50';
});

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
const saveToLocalStorage = function() {
  const cards = cardContainer.querySelectorAll('.card');
  const cardData = [];

  cards.forEach(function(card) {
    const header = card.querySelector('.card-header div').innerHTML;
    const lists = card.querySelectorAll('.list-item');
    const listData = [];

    lists.forEach(function(list) {
      const text = list.querySelector('div:first-child').innerHTML;
      const date = list.querySelector('.date').innerHTML;
      listData.push({ text, date });
    });

    cardData.push({ header, listData });
  });

  localStorage.setItem('cardData', JSON.stringify(cardData));
};

const loadFromLocalStorage = function() {
  const cardData = JSON.parse(localStorage.getItem('cardData')) || [];

  cardData.forEach(function(card) {
    const cardElement = createCard(card.header);
    card.listData.forEach(function(list) {
      createListItem(cardElement.querySelector('.card-list'), list.text, list.date);
    });
  });
};

window.addEventListener('load', function() {
  loadFromLocalStorage();
});

createCardButton.addEventListener('click', function() {
  createCard(titleInput.value);
  titleInput.value = '';
  saveToLocalStorage();
});

titleInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    createCard(titleInput.value);
    titleInput.value = '';
    saveToLocalStorage();
  }
});

const exportData = function() {
  const data = JSON.stringify(JSON.parse(localStorage.getItem('cardData')) || []);
  const blob = new Blob([data], { type: 'text/json' });
  const href = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = href;
  downloadLink.download = 'card-data.json';
  downloadLink.click();
};

const importData = function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      const data = JSON.parse(reader.result);
      localStorage.setItem('cardData', JSON.stringify(data));
      location.reload();
    });
    reader.readAsText(event.target.files[0]);
  });
  input.click();
};

const header = document.createElement('header');
document.body.appendChild(header);

const exportButton = document.createElement('button');
exportButton.innerHTML = 'Export';
exportButton.style.backgroundColor = '#4CAF50';
exportButton.style.color = 'white';
exportButton.style.padding = '10px 20px';
exportButton.style.borderRadius = '5px';
exportButton.style.border = '0px';
exportButton.style.cursor = 'pointer';
exportButton.style.marginRight = '10px';
exportButton.style.transition = 'background-color 0.2s ease-out';
exportButton.addEventListener('click', exportData);
exportButton.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#3e8e41';
});
exportButton.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#4CAF50';
});
document.querySelector('.header-section').appendChild(exportButton);

const importButton = document.createElement('button');
importButton.innerHTML = 'Import';
importButton.style.backgroundColor = '#2196F3';
importButton.style.color = 'white';
importButton.style.padding = '10px 20px';
importButton.style.borderRadius = '5px';
importButton.style.border = '0px';
importButton.style.cursor = 'pointer';
importButton.style.marginRight = '10px';
importButton.style.transition = 'background-color 0.2s ease-out';
importButton.addEventListener('click', importData);
importButton.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#0d47a1';
});
importButton.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#2196F3';
});
document.querySelector('.header-section').appendChild(importButton);

const shareButton = document.createElement('button');
shareButton.innerHTML = 'Share';
shareButton.style.backgroundColor = '#4CAF50';
shareButton.style.color = 'white';
shareButton.style.padding = '10px 20px';
shareButton.style.borderRadius = '5px';
shareButton.style.border = '0px';
shareButton.style.cursor = 'pointer';
shareButton.style.transition = 'background-color 0.2s ease-out';
shareButton.addEventListener('click', shareOnSocialMedia);
shareButton.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#3e8e41';
});
shareButton.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#4CAF50';
});
document.querySelector('.header-section').appendChild(shareButton);

function shareOnSocialMedia() {
  const cards = document.querySelectorAll('.card');
  let message = '';

  for (const card of cards) {
    const cardTitle = card.querySelector('.card-header').innerText;
    message += `Card Title: ${cardTitle}\n`;

    const lists = card.querySelectorAll('.list');
    for (const list of lists) {
      const listText = list.querySelector('.list-text').innerText;
      message += `- ${listText}\n`;
    }
    message += '\n';
  }

  prompt('Copy the message to share on social media:', message);
}

function shareOnWhatsApp() {
  const cards = document.querySelectorAll('.card');
  let message = '';

  for (const card of cards) {
    const cardTitle = card.querySelector('.card-header').innerText;
    message += `Card Title: ${cardTitle}\n`;

    const lists = card.querySelectorAll('.list');
    for (const list of lists) {
      const listText = list.querySelector('.list-text').innerText;
      message += `- ${listText}\n`;
    }
    message += '\n';
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsAppURL = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsAppURL, '_blank');
}

const shareOnWhatsAppButton = document.createElement('button');
shareOnWhatsAppButton.innerHTML = 'Share on WhatsApp';
shareOnWhatsAppButton.style.backgroundColor = '#25D366';
shareOnWhatsAppButton.style.color = 'white';
shareOnWhatsAppButton.style.padding = '10px 20px';
shareOnWhatsAppButton.style.borderRadius = '5px';
shareButton.style.border = '0px';
shareOnWhatsAppButton.style.cursor = 'pointer';
shareOnWhatsAppButton.style.marginLeft = '10px';
shareOnWhatsAppButton.style.transition = 'background-color 0.2s ease-out';
shareOnWhatsAppButton.addEventListener('click', shareOnWhatsApp);
shareOnWhatsAppButton.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#3e8e41';
});
shareOnWhatsAppButton.addEventListener('mouseleave', function() {
  this.style.backgroundColor = '#4CAF50';
});
document.querySelector('.header-section').appendChild(shareOnWhatsAppButton);