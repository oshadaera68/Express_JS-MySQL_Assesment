const express = require('express')
const customer = require('./Routes/customer')
const item = require('./Routes/item')
const order = require('./Routes/order')
const orderdetail = require('./Routes/orderdetail')
const app = express()
const port = 3000

app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)
app.use('./order',order)
app.use('./orderdetail', orderdetail)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`JS app listening on port ${port}`)
})