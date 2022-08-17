const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

// creating item table
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        var itemTable = "CREATE TABLE IF NOT EXISTS item (code VARCHAR(15) PRIMARY KEY, description TEXT, qtyOnHand INT, unitPrice DOUBLE)"
        connection.query(itemTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

// get all item
router.get('/', (req, res) => {
    var getAllItemQuery = "SELECT * FROM item";
    connection.query(getAllItemQuery, (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    })
})

module.exports = router;