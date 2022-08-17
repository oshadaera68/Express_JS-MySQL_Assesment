const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

// creating customer table
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection Established and connected mysql");
        var cusTable = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address TEXT, salary DOUBLE)"
        connection.query(cusTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

// get all customer
router.get('/', (req, res) => {
    var getAllQuery = "SELECT * FROM customer";
    connection.query(getAllQuery, (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    })
})

// save customer
router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var saveQuery = "INSERT INTO customer(id,name,address,salary) VALUES(?,?,?,?)";

    connection.query(saveQuery, [id, name, address, salary], (err) => {
        if (err) {
            res.send({ "message": "duplicate entry" })
        } else {
            res.send({ "message": "Customer saved" })
        }
    })
})

//update customer
router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var updateQuery = "UPDATE customer SET name=?, address=?, salary=? WHERE id=?";
    connection.query(updateQuery, [name, address, salary, id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "customer updated" })
        } else {
            res.send({ "message": "customer is not found. try again" })
        }
    })
})

//search customer
router.get('/:id', (req, res) => {
    const id = req.params.id;

    var seacrhQuery = "SELECT * FROM customer WHERE id=?"

    connection.query(seacrhQuery, [id], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})

// delete customer
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    var deleteQuery = "DELETE FROM customer WHERE id=?";

    connection.query(deleteQuery, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "customer is deleted" })
        } else {
            res.send({ "message": "customer is not found. try again" })
        }
    })
})

module.exports = router;