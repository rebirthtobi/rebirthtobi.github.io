'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var CURRENCY_API_URL = 'https://free.currencyconverterapi.com/api/v5/currencies';

var convertBtn = document.getElementById('convert');
var toSelect = document.getElementById('toSelect');
var toEntry = document.getElementById('toEntry');
var fromSelect = document.getElementById('fromSelect');
var fromEntry = document.getElementById('fromEntry');

var request = function () {
  _newArrowCheck(undefined, undefined);

  getCurrency().then(function (currency) {
    _newArrowCheck(undefined, undefined);

    if (currency.length > 0) {
      sortData(currency);
    } else {
      fetch(CURRENCY_API_URL).then(function (response) {
        _newArrowCheck(undefined, undefined);

        return response.json();
      }.bind(undefined)).then(function (jsonData) {
        _newArrowCheck(undefined, undefined);

        putCurrency(jsonData.results);
        sortData(jsonData.results);
      }.bind(undefined));
    }
  }.bind(undefined));
}.bind(undefined);

var sortData = function (data) {
  _newArrowCheck(undefined, undefined);

  var rawkeys = Object.keys(data);
  var finalData = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rawkeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var raw = _step.value;

      finalData.push(data[raw]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  displayData(finalData);
}.bind(undefined);

var displayData = function (finalData) {
  _newArrowCheck(undefined, undefined);

  content = finalData.map(function (item) {
    _newArrowCheck(undefined, undefined);

    return '<option value="' + item.id + '">' + item.currencyName + ' ' + item.id + '</option>';
  }.bind(undefined)).join('');
  fromSelect.innerHTML = content;
  toSelect.innerHTML = content;
}.bind(undefined);

var convert = function () {
  _newArrowCheck(undefined, undefined);

  var fromValue = fromEntry.value;
  var forwardConvert = fromSelect.value + '_' + toSelect.value;
  var backwardConvert = toSelect.value + '_' + fromSelect.value;
  var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + forwardConvert + ',' + backwardConvert + '&compact=ultra';
  getConvertValues(forwardConvert).then(function (val) {
    _newArrowCheck(undefined, undefined);

    if (val) {
      toEntry.value = val * fromValue;
    } else {
      fetch(url).then(function (response) {
        _newArrowCheck(undefined, undefined);

        return response.json();
      }.bind(undefined)).then(function (jsonData) {
        _newArrowCheck(undefined, undefined);

        putConvertValues(forwardConvert, jsonData[forwardConvert]);
        toEntry.value = jsonData[forwardConvert] * fromValue;
      }.bind(undefined));
    }
  }.bind(undefined));
}.bind(undefined);

var checkVal = function (e) {
  _newArrowCheck(undefined, undefined);

  if (e.target.value) {
    convertBtn.classList.remove('disabled');
    convertBtn.removeAttribute('disabled');
  } else {
    convertBtn.classList.add('disabled');
    convertBtn.setAttribute('disabled', 'true');
  }
}.bind(undefined);

var clearData = function () {
  _newArrowCheck(undefined, undefined);

  toEntry.value = '';
  fromEntry.value = '';
}.bind(undefined);

var swap = function () {
  _newArrowCheck(undefined, undefined);

  var fromVal = fromSelect.value;
  var toVal = toSelect.value;
  fromSelect.value = toVal;
  toSelect.value = fromVal;
  clearData();
}.bind(undefined);

document.getElementById('indexLink').classList.add('active');
document.getElementById('swapIcon').addEventListener("click", swap, { passive: true });

toSelect.addEventListener('change', clearData);
fromSelect.addEventListener('change', clearData);

fromEntry.addEventListener("input", checkVal);
convertBtn.addEventListener("click", convert);

request();