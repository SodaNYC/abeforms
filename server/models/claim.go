package models

import "github.com/dgrijalva/jwt-go"

type Claim struct{
	User Lawyers `json:"user"`
	jwt.StandardClaims
}