// app.js

// add listeners for online and offline events
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
function updateOnlineStatus(event) {
  var condition = navigator.onLine ? 'online' : 'offline';
  console.log("Network status: " + condition, event);
}

// beforeinstallprompt event fired
window.addEventListener('beforeinstallprompt', function(e) {
  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
  e.userChoice.then(function(choiceResult) {
      console.log('User choice outcome', choiceResult);
    if (choiceResult.outcome == 'dismissed')
      console.log('User cancelled home screen installation.');
    else
      console.log('User added app to home screen.');
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
		console.error('Registration failed.', error);
		
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
  
  // Request geo location data
  if ('geolocation' in navigator) {
    var watchID, 
        cordinates,
        target = { latitude : 0, longitude: 0 }, 
        options = { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 };
    
    // ask permission
    watchID = navigator.geolocation.watchPosition(geoSuccess, geoError, options);
    
    // success
    function geoSuccess(position) {
      console.log('Position updated.', position);

      var latlon = position.coords.latitude + "," + position.coords.longitude;
      if (cordinates !== latlon) {
          cordinates = latlon;
          var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+cordinates+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBC1oBmfyXGtw1i3BdVvMY1u7-aB_AdDHs";
          var x = document.getElementsByClassName("col-md-2");
          var i;
          for (i = 0; i < x.length; i++) {
            x[i].innerHTML = "<img src='"+img_url+"'>";
          }
      }

      
      if (target.latitude === position.coords.latitude 
      &&  target.longitude === position.coords.longitude) {
         console.warn('You reached the target.');
         //navigator.geolocation.clearWatch(id);
      }
    }
    
    // failure 
    function geoError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.warn("User denied the request for Geolocation.", error)
          break;
        case error.POSITION_UNAVAILABLE:
          console.warn("Location information is unavailable.", error)
          break;
        case error.TIMEOUT:
          console.warn("The request to get user location timed out.", error)
          break;
        case error.UNKNOWN_ERROR:
          console.warn("An unknown error occurred.", error)
          break;
      }
    }
  }

  // Request permission to send notifications
  if ('requestPermission' in Notification) {
	Notification.requestPermission().then(function() {
		return navigator.serviceWorker.ready;
	}).then(function(sw) {
		// Tell it to subscribe with the push server
		return sw.pushManager.subscribe({userVisibleOnly: true});
	}).then(function(subscription) {
		// Now we have a subscription!
		console.log('Subscribed to push notifications.', subscription)
	}).catch(function(error) {
		console.error('Push subscription error.', error);
	});
  }  
  
})();