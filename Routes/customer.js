const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(dbase.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }else{
        console.log("Connection Established and connected mysql");
        var cusTable = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address TEXT, salary DOUBLE)"
        connection.query(cusTable,function(err,result){
            if(result.warningCount===0){
                console.log("table created");
            }
        })
    }
})



module.exports = router;