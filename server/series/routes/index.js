const route = require('express').Router()
const SeriesController = require('../controllers/series')

route.get('/series', SeriesController.find)
route.post('/series', SeriesController.create)
route.put('/series/:id', SeriesController.update)
route.delete('/series/:id', SeriesController.delete)

module.exports = route