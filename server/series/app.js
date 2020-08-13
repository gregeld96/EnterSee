const express = require('express')
const app = express()
const port = 3002
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server Series is running`)
})