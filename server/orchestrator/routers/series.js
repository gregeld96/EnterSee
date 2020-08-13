const route = require('express').Router()
const SeriesController = require('../controllers/series')

route.get('/', SeriesController.find)
route.post('/', SeriesController.create)
route.put('/:id', SeriesController.update)
route.delete('/:id', SeriesController.delete)

module.exports = route