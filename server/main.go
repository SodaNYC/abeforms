package main

import (
	"github.com/austinlhx/abe/app"
	"github.com/austinlhx/abe/database"
)

func main() {
	database.ConnectDB()
	app.StartApp()
}
