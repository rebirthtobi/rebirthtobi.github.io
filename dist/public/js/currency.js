'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var CURRENCY_API_URL = 'https://free.currencyconverterapi.com/api/v5/currencies';
var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

  var finalData = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = alpha[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var alp = _step.value;

      finalData[alp] = [];
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

  data.forEach(function (item) {
    _newArrowCheck(undefined, undefined);

    var tempChar = item.currencyName.charAt(0);
    finalData[tempChar].push(item);
  }.bind(undefined));
  displayData(finalData);
}.bind(undefined);

var displayData = function (finalData) {
  _newArrowCheck(undefined, undefined);

  var content = '';
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = alpha[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var alp = _step2.value;

      content += '<div class="col-sm-6">';
      if (finalData[alp]) {
        content += '<h4 class="alphaHeader" style="color:blue">' + alp + '</h4>';
        content += finalData[alp].map(function (item) {
          _newArrowCheck(undefined, undefined);

          return '<div class="row">\n              <div class="col-sm-12 d-flex currencyDiv">\n                <p>' + item.currencyName + '</p>\n                <span class="ml-auto">' + item.id + '</span>\n              </div>\n            </div>';
        }.bind(undefined)).join('');
      }
      content += '</div>';
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  document.getElementById('searchGif').style.display = 'none';
  document.getElementById('tip').style.display = 'block';
  document.getElementById('contentContainer').innerHTML = content;
}.bind(undefined);

document.getElementById('currencyLink').classList.add('active');

request();