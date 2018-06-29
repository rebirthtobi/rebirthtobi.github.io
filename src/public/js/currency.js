const CURRENCY_API_URL = 'https://free.currencyconverterapi.com/api/v5/currencies';
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const request = () => {
  getCurrency().then(currency => {
    if (currency.length > 0) {
      sortData(currency);
    } else {
      fetch(CURRENCY_API_URL)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        putCurrency(jsonData.results);
        sortData(jsonData.results);
      });
    }
  });
};

const sortData = (data) => {
  let finalData = {};
  for (let alp of alpha) {
    finalData[alp] = [];
  }
  data.forEach(item => {
    let tempChar = item.currencyName.charAt(0);
    finalData[tempChar].push(item);
  });
  displayData(finalData);
};

const displayData = (finalData) => {
  let content = '';
  for (let alp of alpha) {
    content += '<div class="col-sm-6">';
    if (finalData[alp]) {
      content += `<h4 class="alphaHeader" style="color:blue">${alp}</h4>`;
      content += finalData[alp].map(item => {
        return `<div class="row">
              <div class="col-sm-12 d-flex currencyDiv">
                <p>${item.currencyName}</p>
                <span class="ml-auto">${item.id}</span>
              </div>
            </div>`;
      }).join('');
    }
    content += '</div>';
  }
  document.getElementById('searchGif').style.display = 'none';
  document.getElementById('tip').style.display = 'block';
  document.getElementById('contentContainer').innerHTML = content;
};

document.getElementById('currencyLink').classList.add('active');

request();