const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

// creating order table
connection.connect(function (err){
    if (err) {
        console.log(err);
    } else {
        // var 
    }
})

module.exports = router