const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

// creating order table
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        var orderTable = "CREATE TABLE IF NOT EXISTS orders (id VARCHAR(10) PRIMARY KEY, date DATE, cusId VARCHAR(6), CONSTRAINT FOREIGN KEY(cusId) REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE)";
        connection.query(orderTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

//get all order
router.get('/', (req, res) => {
    var getAllOrderQuery = "SELECT * FROM orders";
    connection.query(getAllOrderQuery, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

module.exports = router