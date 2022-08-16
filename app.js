const express = require('express')
const customer = require('./Routes/customer')
const app = express()
const port = 3000

app.use(express.json())

app.use('/customer',customer)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})