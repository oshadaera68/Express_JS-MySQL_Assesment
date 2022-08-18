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
        var orderTable = "CREATE TABLE IF NOT EXISTS orders (id VARCHAR(10  ) PRIMARY KEY, date DATE, cusId VARCHAR(6), CONSTRAINT FOREIGN KEY(cusId) REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE)";
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

// save order
router.post('/', (req,res)=>{
    const id = req.body.id
    const date = req.body.date
    const cusId = req.body.cusId

    var saveOrderQuery = "INSERT INTO orders(id,date,cusId) VALUES(?,?,?)";

    connection.query(saveOrderQuery, [id,date,cusId], (err) => {
        if (err) {
            res.send({ "message": "duplicate entry" })
        } else {
            res.send({ "message": "order saved" })
        }
    })
})

// update order
router.put('/', (req,res)=>{
    const id = req.body.id
    const date = req.body.date
    const cusId = req.body.cusId

    var updateOrderQuery = "UPDATE orders date=?, cusId=?, WHERE id=?";
    connection.query(updateOrderQuery, [date, cusId, id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "order updated" })
        } else {
            res.send({ "message": "order is not found. try again" })
        }
    })
})

// delete order
router.delete('/:id', (req, res) => {
    const id = req.params.id
    var deleteOrderQuery = "DELETE FROM orders WHERE id=?";
    connection.query(deleteOrderQuery, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "order is deleted" })
        } else {
            res.send({ "message": "order is not found. try again" })
        }
    })
})

// search order
router.get('/:id',(req,res)=>{
    const id = req.params.id
    var searchOrderQuery = "SELECT * FROM orders WHERE id=?"
    connection.query(searchOrderQuery, [id], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})

module.exports = router