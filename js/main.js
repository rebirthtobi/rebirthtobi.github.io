let workerParody = undefined;

const registerSW = () => {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function(reg) {
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

    reg.addEventListener('updatefound', function() {
      trackInstalling(reg.installing);
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
};

trackInstalling = (worker) => {
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  });
};

updateWorker = () => {
  workerParody.postMessage({action: 'skipWaiting'});
  document.getElementById('footer').style.display = 'none';
};

closeBar = () => {
  document.getElementById('footer').style.display = 'none';
};

updateReady = (worker) => {
  workerParody = worker;
  document.getElementById('footer').style.display = 'block';
  document.getElementById('update').addEventListener('click', updateWorker);
  document.getElementById('cancel').addEventListener('click', closeBar);
};

registerSW();