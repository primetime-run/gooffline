// beforeinstallprompt Event fired
window.addEventListener('beforeinstallprompt', function(e) {
  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
  e.userChoice.then(function(choiceResult) {
      console.log('User choice outcome', choiceResult);
    if (choiceResult.outcome == 'dismissed')
      console.log('User cancelled home screen install');
    else
      console.log('User added to home screen');
  });
});

// launch our app
(function() {
  'use strict';

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
	  .register('../service-worker.js', {
	    scope: '/'
	  })
      .then(function(registration) {
		// registration worked
		console.log('Registration succeeded.', registration);

	  }).catch(function(error) {
		// registration failed
		console.error('Registration failed with ' + error);
		
		// Firefox Nightly
		// Go to about:config and set dom.serviceWorkers.enabled to true; restart browser.
		// Chrome Canary
        // Go to chrome://flags and turn on experimental-web-platform-features; restart browser (note that some features are now enabled by default in Chrome.)
		// Opera
		// Go to opera://flags and enable Support for ServiceWorker; restart browser.
		// Microsoft Edge
		// Go to about://flags and tick Enable service workers; restart browser.
	  });
  }
})();