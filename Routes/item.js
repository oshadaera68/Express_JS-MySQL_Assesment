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

router.put('/', (req, res) => {
    const code = req.body.code
    const description = req.body.description
    const qtyOnHand = req.body.qtyOnHand
    const unitPrice = req.body.unitPrice

    var updateItemQuery = "UPDATE item SET description=?, qtyOnHand=?, unitPrice=? WHERE code=?";
    connection.query(updateItemQuery, [description, qtyOnHand, unitPrice, code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "item updated" })
        } else {
            res.send({ "message": "item is not found. try again" })
        }
    })
})

router.delete('/:id', (req, res) => {
    const code = req.params.code
    var deleteItemQuery = "DELETE FROM item WHERE code=?";
    connection.query(deleteItemQuery, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "customer is deleted" })
        } else {
            res.send({ "message": "customer is not found. try again" })
        }
    })
})

module.exports = router;