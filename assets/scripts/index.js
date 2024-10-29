'use strict';

const form = document.forms['star-wars-search'];
form.addEventListener('submit', e => {
  e.preventDefault();
  showInfo();
});

function showInfo() {
  const divDetails = document.querySelector('.star-wars-details');
  const errorDiv = document.querySelector('.error');
  const loader = document.querySelector('.loader');

  const entity = form.elements.entity.value;
  const id = form.elements.identifier.value;

  if (!id) {
    alert('Заполните, пожалуйста, все поля');
    return;
  }

  clear(divDetails);
  clear(errorDiv);

  loader.classList.remove('hidden');

  fetch(`https://swapi.py4e.com/api/${entity}/${id}/`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    })
    .then(data => {
      addInfoToPage(data, entity);
    })
    .catch(error => {
      const errorDiv = document.querySelector('.error');
      errorDiv.textContent = `Ошибка: ${error.message}. Не удалось найти данные по запросу.`;

      const idInput = form.elements.identifier;
      idInput.value = '';
    })
    .finally(() => loader.classList.add('hidden'));
}

function addInfoToPage(data, entity) {
  const divDetails = document.querySelector('.star-wars-details');

  if (entity === 'films') {
    divDetails.textContent = `Introduction: ${data['opening_crawl']}`;
  } else {
    divDetails.textContent = `Name: ${data.name}`;
  }

  const idInput = form.elements.identifier;
  idInput.value = '';
}

function clear(elem) {
  elem.textContent = '';
}
