package controllers

import (
	"github.com/austinlhx/abe/models"
	"github.com/austinlhx/abe/services"
	"github.com/austinlhx/abe/utils"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)
var FirstTime string 
var SecondTime string 
var ThirdTime string 

func GetUnassignedCase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	log.Println("GetUnassignedCase Function Called")
	log.Println(r.Header)
	user := models.Clients{}
	user = r.Context().Value(utils.UserKey("user")).(models.Clients)
	unassignedCases, apiErr := services.GetUnassignedCase(user)
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	json.NewEncoder(w).Encode(unassignedCases)
}

func GetAssignedCase(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	log.Println("GetAssignedCase Function is called")
	user := models.Clients{}
	user = r.Context().Value(utils.UserKey("user")).(models.Clients)
	log.Println(user)
	log.Println("This is the user")
	assignedCase, apiErr := services.GetAssignedCase(user)
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	json.NewEncoder(w).Encode(assignedCase)

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
	FirstTime = zoomMeetingInfo.FirstTime
	SecondTime = zoomMeetingInfo.SecondTime
	ThirdTime = zoomMeetingInfo.ThirdTime
}

func ScheduleMeeting(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	apiErr := services.ScheduleMeeting(params["id"], FirstTime, SecondTime, ThirdTime)
	if apiErr != nil {
		jsonValue, _ := json.Marshal(apiErr)
		w.WriteHeader(apiErr.StatusCode)
		w.Write([]byte(jsonValue))
		return
	}
	log.Println(FirstTime)

}

