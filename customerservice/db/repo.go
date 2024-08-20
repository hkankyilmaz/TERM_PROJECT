package db

import (
	"database/sql"
	"fmt"
	"net/http"
)

type Customer struct {
	ID      int    `json:"id"`
	Name    string `json:"name,omitempty"`
	Email   string `json:"email"`
	Address string `json:"address,omitempty"`
}



func InsertCustomer(d *PostgresDB , customer Customer) (int, *Customer, error) {


	stmt := `INSERT INTO customers (name, email, address) VALUES ($1, $2, $3) RETURNING id`
	err := d.DB.QueryRow(stmt, customer.Name, customer.Email, customer.Address).Scan(&customer.ID)
	if err != nil {
	    fmt.Println(err)
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, &customer, nil


}


func GetCustomer(d *PostgresDB, id int) (int, *Customer, error) {
	stmt := `SELECT id, name, email, address FROM customers WHERE id = $1`
	var customer Customer
	err := d.DB.QueryRow(stmt, id).Scan(&customer.ID, &customer.Name, &customer.Email, &customer.Address)

	if err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	}

	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, &customer, nil
}


func UpdateCustomer(d *PostgresDB, id int, customer Customer) (int, *Customer, error) {
	
	fieldsNum := 0
	fields := make([]interface{}, 0)
	stmt := `UPDATE customers SET `
	if len(customer.Address) != 0 {
		fieldsNum += 1
		stmt += fmt.Sprintf("address = $%d ", fieldsNum)
		fields = append(fields, customer.Address)
	}
	if len(customer.Name) != 0 {
		fieldsNum += 1
		stmt += fmt.Sprintf("name = $%d ", fieldsNum)
		fields = append(fields, customer.Name)
	}
	if fieldsNum == 0 {
		return http.StatusNotModified, &customer, nil
	}
	fieldsNum += 1
	stmt += fmt.Sprintf("WHERE id = $%d RETURNING id, name, email, address", fieldsNum)
	fields = append(fields, id)

	e := d.DB.QueryRow(stmt, fields...).Scan(&customer.ID, &customer.Name, &customer.Email, &customer.Address)

	if e == sql.ErrNoRows {
		return http.StatusNotFound, nil, e
	}

	return http.StatusOK, &customer, e
	
}


func DeleteCustomer(d *PostgresDB, id int) (int, error) {
	stmt := `DELETE FROM customers WHERE id = $1`
	_, err := d.DB.Exec(stmt, id)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}




