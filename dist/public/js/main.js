'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var workerParody = undefined;

var registerSW = function () {
  _newArrowCheck(undefined, undefined);

  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function (reg) {
    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', function () {
      trackInstalling(reg.installing);
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}.bind(undefined);

trackInstalling = function (worker) {
  _newArrowCheck(undefined, undefined);

  worker.addEventListener('statechange', function () {
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  });
}.bind(undefined);

updateWorker = function () {
  _newArrowCheck(undefined, undefined);

  workerParody.postMessage({ action: 'skipWaiting' });
  document.getElementById('footer').style.display = 'none';
}.bind(undefined);

closeBar = function () {
  _newArrowCheck(undefined, undefined);

  document.getElementById('footer').style.display = 'none';
}.bind(undefined);

updateReady = function (worker) {
  _newArrowCheck(undefined, undefined);

  workerParody = worker;
  document.getElementById('footer').style.display = 'block';
  document.getElementById('update').addEventListener('click', updateWorker);
  document.getElementById('cancel').addEventListener('click', closeBar);
}.bind(undefined);

registerSW();