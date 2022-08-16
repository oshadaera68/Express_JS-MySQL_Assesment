const express = require('express')
const customer = require('./Routes/customer')
const item = require('./Routes/item')
const app = express()
const port = 3000

app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})