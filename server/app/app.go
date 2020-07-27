package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/austinlhx/abe/router"
)

func StartApp(){
	r := router.Router()
	fmt.Println("Starting server on the port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
