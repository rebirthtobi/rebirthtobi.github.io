'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

createDB = function () {
  _newArrowCheck(undefined, undefined);

  var dbPromiseDB = idb.open('fxcal-db', 1, function (upgradeDb) {
    _newArrowCheck(undefined, undefined);

    var convertStore = upgradeDb.createObjectStore('convert');
    var currencyStore = upgradeDb.createObjectStore('currency');
  }.bind(undefined));
  return dbPromiseDB;
}.bind(undefined);

putConvertValues = function (key, value) {
  _newArrowCheck(undefined, undefined);

  dbPromise.then(function (db) {
    _newArrowCheck(undefined, undefined);

    var tx = db.transaction('convert', 'readwrite');
    var convertStore = tx.objectStore('convert');
    convertStore.put(value, key);
    return tx.complete;
  }.bind(undefined));
}.bind(undefined);

putCurrency = function (value) {
  _newArrowCheck(undefined, undefined);

  var tempKeys = Object.keys(value);
  dbPromise.then(function (db) {
    _newArrowCheck(undefined, undefined);

    var tx = db.transaction('currency', 'readwrite');
    var currencyStore = tx.objectStore('currency');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tempKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var temp = _step.value;

        currencyStore.put(value[temp], temp);
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

    return tx.complete;
  }.bind(undefined));
}.bind(undefined);

getCurrency = function () {
  _newArrowCheck(undefined, undefined);

  return dbPromise.then(function (db) {
    _newArrowCheck(undefined, undefined);

    var tx = db.transaction('currency');
    var currencyStore = tx.objectStore('currency');
    return currencyStore.getAll();
  }.bind(undefined)).then(function (currency) {
    _newArrowCheck(undefined, undefined);

    return currency;
  }.bind(undefined));
}.bind(undefined);

getConvertValues = function (key) {
  _newArrowCheck(undefined, undefined);

  return dbPromise.then(function (db) {
    _newArrowCheck(undefined, undefined);

    var tx = db.transaction('convert');
    var currencyStore = tx.objectStore('convert');
    return currencyStore.get(key);
  }.bind(undefined)).then(function (convert) {
    _newArrowCheck(undefined, undefined);

    return convert;
  }.bind(undefined));
}.bind(undefined);

var dbPromise = createDB();