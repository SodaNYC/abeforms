package services

import (
	"github.com/austinlhx/abe/domain"
	"github.com/austinlhx/abe/models"
	"github.com/austinlhx/abe/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddCase(caseInfo models.Cases) *utils.ApplicationError {
	return domain.AddCase(caseInfo)
}

func SendEmail() *utils.ApplicationError {
	return domain.SendEmail()
}

func GetClient(email string, password string) (*models.Clients, *utils.ApplicationError) {
	return domain.GetClient(email, password)
}

func AddClient(clientInfo models.Clients) *utils.ApplicationError {
	return domain.AddClient(clientInfo)
}

func GetUnassignedCase(user models.Clients) ([]primitive.M, *utils.ApplicationError) {
	return domain.GetUnassignedCase(user)
}

func GetAssignedCase(user models.Clients) ([]primitive.M, *utils.ApplicationError) {
	return domain.GetAssignedCase(user)
}


func ScheduleMeeting(caseID string, firstTime string, secondTime string, thirdTime string) *utils.ApplicationError {
	return domain.ScheduleMeeting(caseID, firstTime, secondTime, thirdTime)
}
