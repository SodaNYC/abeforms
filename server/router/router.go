package router

import (
	"github.com/austinlhx/abe/router/routes"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	return routes.SetupRoutesWithMiddlewares(router)

}
