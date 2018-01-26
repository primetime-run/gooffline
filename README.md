# Simple GoLang Single Page Progressive Web App
The basic Go Lanuage http file server that sends basic html template, manifest.json, and service worker that uses Bootstrap from CDN and caches all files.

# Note: 
Requires https. In development use 127.0.0.1. Localhost will not work and will throw a warning.

Supports the latest browser versions of Chrome, FireFox, MS Edge, and Mobile Safari.

# To get it up and running, install Go Language. 
https://golang.org/dl/

Once installed, clone the project to your directory and find the server.gg file and enter in the command line:

go run server.go 

Then navigate to 127.0.0.1:8080 

Use chrome for dev tools to simulate offline in:
Application -> Service Worker -> check the offline checkbox

Refresh the page and you should still see a web page!

To verify, try this on other websites within chrome dev tools and more often than not on older websites, you will recieve the offline message. 

# Address in use binding error.
In testing, the port can stay in use sometimes and you may need to kill the process by id to use the same port.

In terminal, find the Process ID and kill it. 

lsof -i tcp:8080 

Then..

kill -9 'PID'
