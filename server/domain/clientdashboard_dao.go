package domain

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/austinlhx/abe/database"
	"github.com/austinlhx/abe/models"
	"github.com/austinlhx/abe/utils"
	"github.com/donvito/zoom-go/zoomAPI"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUnassignedCase(user models.Clients) ([]primitive.M, *utils.ApplicationError) {
	collection := database.ClaimsCollection
	filter := &bson.M{"emailaddress": user.EmailAddress}
	data, err := collection.Find(context.TODO(), filter)
	var cases []primitive.M

	for data.Next(context.Background()) {
		var lawyerEmail bson.M
		e := data.Decode(&lawyerEmail)
		if e != nil {
			log.Fatal(e)
		}
		cases = append(cases, lawyerEmail)
	}

	if err != nil {
		return nil, &utils.ApplicationError{
			Message:    fmt.Sprintf("Getting cases from DB failed"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}

	data.Close(context.Background())

	var unassignedCases []primitive.M
	for _, b := range cases {
		if b[("lawyerassigned")] == "" {
			unassignedCases = append(unassignedCases, b)
		}
	}
	return unassignedCases, nil
}

func GetAssignedCase(user models.Clients) ([]primitive.M, *utils.ApplicationError) {
	collection := database.ClaimsCollection
	filter := &bson.M{"emailaddress": user.EmailAddress}
	data, err := collection.Find(context.TODO(), filter)
	var cases []primitive.M
	for data.Next(context.Background()) {
		var lawyerEmail bson.M
		e := data.Decode(&lawyerEmail)
		if e != nil {
			log.Fatal(e)
		}
		cases = append(cases, lawyerEmail)
	}
	if err != nil {
		return nil, &utils.ApplicationError{
			Message:    fmt.Sprintf("Getting cases from DB failed"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}

	data.Close(context.Background())

	var assignedCases []primitive.M
	for _, b := range cases {
		if b[("lawyerassigned")] != "" {
			assignedCases = append(assignedCases, b)
		}
	}
	return assignedCases, nil
}

func CreateMeeting(zoomInfo utils.ZoomMeeting, user models.Lawyers) *utils.ApplicationError {
	apiClient := zoomAPI.NewClient("https://api.zoom.us/v2", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Inp6ODZTcmR0UmRLMm11TU8tTktKR0EiLCJleHAiOjE1OTI2Nzg1MDksImlhdCI6MTU5MjU5MjEwN30.AuoGUgjoI4T4YL3dnnIHjx2DS7HCp82iD-djrI4-UaE")
	userId := ("austin.abe.legal@gmail.com")
	log.Println(user.EmailAddress)
	var resp zoomAPI.CreateMeetingResponse
	var err error

	resp, err = apiClient.CreateMeeting(userId,
		"Client and Lawyer Consultation",
		2,
		"2020-06-24T22:00:00Z",
		30,
		zoomInfo.FirstTime,
		"Asia/Singapore",
		"pass8888", //set this with your desired password for better security, max 8 chars
		"Discuss next steps and ways to contribute for this project.",
		nil,
		nil)

	if err != nil {
		return &utils.ApplicationError{
			Message:    fmt.Sprintf("Creating Zoom Meeting Failed!"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}

	fmt.Printf("Created meeting : id = %d, topic = %s, join url = %s, start time = %s\n", resp.Id,
		resp.Topic, resp.JoinUrl, resp.StartTime)

	return nil
}

func ScheduleMeeting(caseID string, firstTime string, secondTime string, thirdTime string) *utils.ApplicationError {
	id, err := primitive.ObjectIDFromHex(caseID)
	if err != nil {
		return &utils.ApplicationError{
			Message:    fmt.Sprintf("Taking case failed!"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}

	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"firsttime": firstTime, "secondtime": secondTime, "thirdtime": thirdTime}}
	_, error := database.ClaimsCollection.UpdateOne(context.Background(), filter, update)
	if error != nil {
		return &utils.ApplicationError{
			Message:    fmt.Sprintf("Updating case to DB failed!"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}
	
	return nil

}
