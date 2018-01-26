// HTTP server serving static files
package main

import (
"log"
"net/http")

func main() {
    http.Handle("/", http.FileServer(http.Dir("./static")))
    log.Println(http.ListenAndServe(":8080", nil))
}

// # if bind address error in use error...
//
// # list of 
// lsof -i tcp:8080  
//
// #...returns <PID>
// # find <PID> in the list of and..
//
// # kill 
// kill -9 <PID>
