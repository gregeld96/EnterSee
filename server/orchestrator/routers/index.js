const route = require('express').Router()
const seriesRoute = require('./series')
const moviesRoute = require('./movies')

route.get('/', (req, res) => {
    res.send('Welcome')
})

route.use('/movies', moviesRoute)
route.use('/series', seriesRoute)


module.exports = route