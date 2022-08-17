const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

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

router.get('/', (req, res) => {
    var getAllQuery = "SELECT * FROM customer";
    connection.query(getAllQuery, (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    })
})


router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var saveQuery = "INSERT INTO customer(id,name,address,salary) VALUES(?,?,?,?)";

    connection.query(saveQuery, [id, name, address, salary], (err) => {
        if (err) {
            res.send({ "message": "Successfully Saved" })
        } else {
            res.send({ "message": "Customer is not saved" })
        }
    })
})

module.exports = router;