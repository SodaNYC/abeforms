package domain

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/austinlhx/abe/database"
	"github.com/austinlhx/abe/models"
	"github.com/austinlhx/abe/utils"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetCase() ([]primitive.M, *utils.ApplicationError) {
	collection := database.ClaimsCollection
	data, err := collection.Find(context.Background(), bson.D{{}}) //TODO: Find all with empty lawyers
	if err != nil {
		return nil, &utils.ApplicationError{
			Message:    fmt.Sprintf("Getting cases from DB failed"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}
	var clients []primitive.M
	for data.Next(context.Background()) {
		var lawyerEmail bson.M
		e := data.Decode(&lawyerEmail)
		if e != nil {
			log.Fatal(e)
		}
		clients = append(clients, lawyerEmail)
	}

	if err := data.Err(); err != nil {
		return nil, &utils.ApplicationError{
			Message:    fmt.Sprintf("Getting cases from DB failed"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}

	data.Close(context.Background())

	var openCases []primitive.M
	for _, b := range clients {
		if b[("lawyerassigned")] == "" {
			openCases = append(openCases, b)
		}
	}
	return openCases, nil
}

func GetEachCase(user models.Lawyers) ([]primitive.M, *utils.ApplicationError) {
	collection := database.ClaimsCollection
	filter := &bson.M{"lawyerassigned": user.EmailAddress}
	data, err := collection.Find(context.TODO(), filter)
	var eachCases []primitive.M
	for data.Next(context.Background()) {
		var lawyerEmail bson.M
		e := data.Decode(&lawyerEmail)
		if e != nil {
			log.Fatal(e)
		}
		eachCases = append(eachCases, lawyerEmail)
	}
	if err != nil {
		return nil, &utils.ApplicationError{
			Message:    fmt.Sprintf("Getting cases from DB failed"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}
	}
	return eachCases, nil
}

func TakeCase(caseID string, user models.Lawyers) *utils.ApplicationError {
	log.Println("Running TakeCase now......!!!!!!!!......!!!!!......")
	id, err := primitive.ObjectIDFromHex(caseID)
	if err != nil {
		return &utils.ApplicationError{
			Message:    fmt.Sprintf("Taking case failed!"),
			StatusCode: http.StatusInternalServerError,
			Code:       "internal_error",
		}

	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"lawyerassigned": user.EmailAddress}}
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

