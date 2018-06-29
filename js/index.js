const CURRENCY_API_URL = 'https://free.currencyconverterapi.com/api/v5/currencies';

const convertBtn = document.getElementById('convert');
const toSelect = document.getElementById('toSelect');
const toEntry = document.getElementById('toEntry');
const fromSelect = document.getElementById('fromSelect');
const fromEntry = document.getElementById('fromEntry');

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
  let rawkeys = Object.keys(data);
  let finalData = [];
  for (let raw of rawkeys) {
    finalData.push(data[raw]);
  }
  displayData(finalData);
};

const displayData = (finalData) => {
  content = finalData.map(item => {
    return `<option value="${item.id}">${item.currencyName} ${item.id}</option>`;
  }).join('');
  fromSelect.innerHTML = content;
  toSelect.innerHTML = content;
};

const convert = () => {
  let fromValue = fromEntry.value;
  let forwardConvert = `${fromSelect.value}_${toSelect.value}`;
  let backwardConvert = `${toSelect.value}_${fromSelect.value}`;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${forwardConvert},${backwardConvert}&compact=ultra`;
  getConvertValues(forwardConvert).then(val => {
    if (val) {
      toEntry.value = val * fromValue;
    } else {
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        putConvertValues(forwardConvert, jsonData[forwardConvert]);
        toEntry.value = jsonData[forwardConvert] * fromValue;
      });
    }
  });
};

const checkVal = (e) => {
  if (e.target.value) {
    convertBtn.classList.remove('disabled');
    convertBtn.removeAttribute('disabled');
  } else {
    convertBtn.classList.add('disabled');
    convertBtn.setAttribute('disabled', 'true');
  }
};

const clearData = () => {
  toEntry.value = '';
  fromEntry.value = '';
};

const swap = () => {
  let fromVal = fromSelect.value;
  let toVal = toSelect.value;
  fromSelect.value = toVal;
  toSelect.value = fromVal;
  clearData();
};

document.getElementById('indexLink').classList.add('active');
document.getElementById('swapIcon').addEventListener("click", swap, {passive: true});

toSelect.addEventListener('change', clearData);
fromSelect.addEventListener('change', clearData);

fromEntry.addEventListener("input", checkVal);
convertBtn.addEventListener("click", convert);

request();