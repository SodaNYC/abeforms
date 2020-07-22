package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"../models"
	"../services"
	"../utils"
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

func CreateMeeting(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	/*var meetingInfo models.Lawyers
	if err := json.NewDecoder(r.Body).Decode(&meetingInfo); err != nil {
		apiErr := &utils.ApplicationError{
			Message:    "decoding lawyer info failed",
			StatusCode: http.StatusInternalServerError,
			Code:       "server_error",
		}
		jsonValue, err := json.Marshal(apiErr)
		if err != nil {
			log.Println(err)
		}
		w.WriteHeader(apiErr.StatusCode)
		w.Write(jsonValue)
		log.Println("Something came up wrong while decoding lawyer info")
		return
	}
	user := models.Lawyers{}
	user = r.Context().Value(utils.UserKey("user")).(models.Lawyers)*/
	user := models.Lawyers{}
	user = r.Context().Value(utils.UserKey("user")).(models.Lawyers)
	log.Println(user)
	var zoomMeetingInfo utils.ZoomMeeting
	if err := json.NewDecoder(r.Body).Decode(&zoomMeetingInfo); err != nil {
		log.Println(err)
		apiErr := &utils.ApplicationError{
			Message:    "decoding zoom_meeting info failed",
			StatusCode: http.StatusInternalServerError,
			Code:       "server_error",
		}
		jsonValue, err := json.Marshal(apiErr)
		if err != nil {
			log.Println(err)
		}
		w.WriteHeader(apiErr.StatusCode)
		w.Write(jsonValue)
		log.Println("Something came up wrong decoding zoom meeting info")
		return
	}

	/*apiErr := services.CreateMeeting(zoomMeetingInfo, user)

	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}*/
	log.Println(zoomMeetingInfo)

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
