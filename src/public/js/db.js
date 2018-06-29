createDB = () => {
  let dbPromiseDB = idb.open('fxcal-db', 1, upgradeDb => {
    let convertStore = upgradeDb.createObjectStore('convert');
    let currencyStore = upgradeDb.createObjectStore('currency');
  });
  return dbPromiseDB;
};

putConvertValues = (key, value) => {
  dbPromise.then(db => {
    let tx = db.transaction('convert', 'readwrite');
    var convertStore = tx.objectStore('convert');
    convertStore.put(value, key);
    return tx.complete;
  });
};

putCurrency = (value) => {
  let tempKeys = Object.keys(value);
  dbPromise.then(db => {
    let tx = db.transaction('currency', 'readwrite');
    var currencyStore = tx.objectStore('currency');
    for (let temp of tempKeys) {
      currencyStore.put(value[temp], temp);
    }
    return tx.complete;
  });
};

getCurrency = () => {
  return dbPromise.then(db => {
      var tx = db.transaction('currency');
      var currencyStore = tx.objectStore('currency');
    return currencyStore.getAll();
  }).then(currency => {
    return currency;
  });
};

getConvertValues = (key) => {
  return dbPromise.then(db => {
      var tx = db.transaction('convert');
      var currencyStore = tx.objectStore('convert');
    return currencyStore.get(key);
  }).then(convert =>  {
    return convert;
  });
};

const dbPromise = createDB();