// HTTP server serving static files
package main

import (
"log"
"net/http")

func main() {
    http.Handle("/", http.FileServer(http.Dir("./static")))
    log.Println(http.ListenAndServe(":8080", nil))
}