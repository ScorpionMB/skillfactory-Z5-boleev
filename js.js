// Запрос на сервер   
const useRequest = (page, limit) => {
  
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
   .then((response) => { 
     return response.json(); })
   .then((data) => { 
     return data; })
   .catch(() => { console.log('error') });
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

// Проверяем хранилище и, если есть сохраненные данные, выводим результат
const myJSON = JSON.parse(localStorage.getItem('myJSON'));
    if (myJSON) {
      console.log('myJSON', myJSON)
      resultNode.innerHTML = displayResult(myJSON);
    }
   
// Функция для форматирования вывода результата
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img     
          src="${item.download_url}"
          class="card-image"
        />
        <p class="autor">${item.author}</p>
      </div>
    `;
    cards += cardBlock;
  });
  return cards;
};

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {

  const inp1 = Number(document.querySelector('.j-inp-1').value);
  const inp2 = Number(document.querySelector('.j-inp-2').value);
  if ((inp1 < 1 || inp1 > 10 || isNaN(inp1) == true) && (inp2 < 1 || inp2 > 10 || isNaN(inp2) == true)) {
       resultNode.innerHTML = 'Ошибка! Номер страницы и лимит вне диапазона от 1 до 10'
       console.log('Номер страницы и лимит вне диапазона от 1 до 10')  
    } else if (inp1 < 1 || inp1 > 10 || isNaN(inp1) == true) {
       resultNode.innerHTML = 'Ошибка! Страница вне диапазона от 1 до 10'
       console.log('Страница вне диапазона от 1 до 10')
    } else if (inp2 < 1 || inp2 > 10 || isNaN(inp2) == true) {
       resultNode.innerHTML = 'Ошибка! Лимит вне диапазона от 1 до 10'
       console.log('Лимит вне диапазона от 1 до 10')
    } else {
       console.log('start');
      
      // Выводим результат
       const requestResult = await useRequest(inp1, inp2);
       console.log('requestResult', requestResult);
       resultNode.innerHTML = displayResult(requestResult);
      // Записываем результат запроса в хранилище
       localStorage.setItem('myJSON', JSON.stringify(requestResult));

       console.log('end');
  }
});

