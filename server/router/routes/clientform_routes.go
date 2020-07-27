package routes

import (
	"net/http"

	"github.com/austinlhx/abe/controllers"
)

var clientFormRoutes = []Route{
	Route{
		URI:          "/client/api/client",
		Method:       http.MethodPost,
		Handler:      controllers.AddCase,
		AuthRequired: false,
	},
}
