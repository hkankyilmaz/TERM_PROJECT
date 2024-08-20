package main

import (
	"customerservice/db"
	"customerservice/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {

	fmt.Println("Starting the application...")

	db := db.GetDB()

	a := service.GetApp(db)

	r := gin.Default()

	r.POST("/customers", a.PostHandler)
	r.GET("/customers/:customerId", a.GetHandler)
	r.PUT("/customers/:customerId", a.PutHandler)
	r.DELETE("/customers/:customerId", a.DeleteHandler)

	r.Run("localhost:8080")
}