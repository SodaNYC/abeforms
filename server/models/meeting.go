package models

type Meeting struct{
	SelectedDay      string             `json:"SelectedDay,omitempty"`
	FirstTime       string             `json:"FirstTime,omitempty"`
	SecondTime    string             `json:"SecondTime,omitempty"`
	ThirdTime   string             `json:"ThirdTime,omitempty"`
}