const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

// order detail table created
connection.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        var orderDetailTable = "CREATE TABLE IF NOT EXISTS orderdetail(orderId VARCHAR(10) PRIMARY KEY, itemCode VARCHAR(15) PRIMARY KEY, qty INT, unitPrice DOUBLE)";
        if (err) {
            console.log(err);
        } else {
            connection.query(orderDetailTable, function (err, result) {
                if(result.warningCount===0){
                    console.log("table created");
                }
            })
        }
    }
})

// get order detail
router.get('/',(req,res)=>{
    var query = "SELECT * FROM orderdetail";
    connection.query(query, (err,rows)=>{
        if (err) console.log(err)
        res.send(rows)
    })
})

// save order detail
router.post('/',(req,res)=>{
    const orderId = req.body.orderId;
    const itemCode = req.body.itemCode;
    const qty = req.body.qty;
    const unitPrice = req.body.unitPrice;

    var query = "INSERT INTO orderdetail (orderId, itemCode, qty, unitPrice) VALUES(?,?,?,?)";
    connection.query(query, [orderId, itemCode, qty, unitPrice], (err)=>{
        if (err) {
            res.send({ "message": "duplicate entry" })
        } else {
            res.send({ "message": "order detail saved" })
        }
    })
})

//update order detail
router.put('/', (req,res)=>{
    const orderId = req.body.orderId;
    const itemCode = req.body.itemCode;
    const qty = req.body.qty;
    const unitPrice = req.body.unitPrice;

    var updateQuery = "UPDATE customer SET itemCode=?, qty=?, unitPrice=? WHERE orderId=?";
    connection.query(updateQuery, [itemCode,qty,unitPrice,orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "order detail updated" })
        } else {
            res.send({ "message": "order detail is not found. try again" })
        }
    })
})

// delete order detail
router.delete('/:id', (req,res)=>{
    const orderId = req.params.orderId;
    var deleteQuery = "DELETE FROM orderdetail WHERE orderId=?";

    connection.query(deleteQuery, [orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "order detail is deleted" })
        } else {
            res.send({ "message": "order detail is not found. try again" })
        }
    })
})

// search order detail
router.get('/:id', (req,res)=>{
    const orderId = req.params.orderId;

    var seacrhQuery = "SELECT * FROM orderdetail WHERE orderId=?"

    connection.query(seacrhQuery, [orderId], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})

module.exports = router