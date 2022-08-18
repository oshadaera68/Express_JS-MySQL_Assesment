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

// save item
router.post('/', (req, res) => {
    const code = req.body.code
    const description = req.body.description
    const qtyOnHand = req.body.qtyOnHand
    const unitPrice = req.body.unitPrice

    var saveItemQuery = "INSERT INTO item(code,description,qtyOnHand,unitPrice) VALUES(?,?,?,?)";

    connection.query(saveItemQuery, [code, description, qtyOnHand, unitPrice], (err) => {
        if (err) {
            res.send({ "message": "duplicate entry" })
        } else {
            res.send({ "message": "item saved" })
        }
    })
})

module.exports = router;