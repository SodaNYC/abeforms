package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/austinlhx/abe/models"
	"github.com/austinlhx/abe/services"
	"github.com/austinlhx/abe/utils"
	"github.com/gorilla/mux"
)

func GetCase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	log.Println("GetCase Function Called")
	log.Println(r.Header)
	openCases, apiErr := services.GetCase()
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	json.NewEncoder(w).Encode(openCases)
}

func GetEachCase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	log.Println("GetEachCase Function is called")
	user := models.Lawyers{}
	user = r.Context().Value(utils.UserKey("user")).(models.Lawyers)
	log.Println(user)
	log.Println("This is the user")
	eachCase, apiErr := services.GetEachCase(user)
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	json.NewEncoder(w).Encode(eachCase)

}



func TakeCase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	user := models.Lawyers{}
	user = r.Context().Value(utils.UserKey("user")).(models.Lawyers)
	log.Println("Cotroller TakeCase......")
	log.Println("The whole url maybe: ", params)
	log.Println("param[id]: ", params["id"])
	apiErr := services.TakeCase(params["id"], user)
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	log.Printf("Case Taken by %v", user.EmailAddress)

}

//ConfirmMeeting	

