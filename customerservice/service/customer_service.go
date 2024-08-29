package service

import (
	"customerservice/db"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)



func createCustomer(d *db.PostgresDB, c *gin.Context) (int, *db.Customer, error) {
	var customer db.Customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		return http.StatusBadRequest, nil, err
	}

	if len(customer.Email) == 0 {
		return http.StatusBadRequest, nil, fmt.Errorf("email cannot be empty")
	}

	statusCode, createdCustomer, err := db.InsertCustomer(d, customer)
	if err != nil {
		return statusCode, nil, err
	}

	return statusCode, createdCustomer, nil
}

func getCustomer(d *db.PostgresDB, c *gin.Context) (int, *db.Customer, error) {
	customerID := c.Param("customerId")
	id, err := strconv.Atoi(customerID)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	statusCode, customer, err := db.GetCustomer(d, id)

	return statusCode, customer, err
}

func getCustomerViaEmail(d *db.PostgresDB, c *gin.Context) (int, *db.Customer, error) {
	email := c.Param("email")

	statusCode, customer, err := db.GetCustomerByEmail(d, email)

	return statusCode, customer, err
}

func updateCustomer(d *db.PostgresDB, c *gin.Context) (int, *db.Customer, error) {
	customerID := c.Param("customerId")
	id, err := strconv.Atoi(customerID)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}
	var customer db.Customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		return http.StatusBadRequest, nil, err
	}
	statusCode, updatedCustomer, err := db.UpdateCustomer(d, id, customer)

	return statusCode, updatedCustomer, err
}

func deleteCustomer(d *db.PostgresDB, c *gin.Context) (int, error) {
	customerID := c.Param("customerId")
	id, err := strconv.Atoi(customerID)
	if err != nil {
		return http.StatusBadRequest, err
	}

	statusCode, err := db.DeleteCustomer(d, id)

	return statusCode, err
}