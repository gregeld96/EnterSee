const express = require('express')
const app = express()
const port = 3001
const route = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', route)

app.listen(port, () => {
    console.log(`Server Movies running`)
})