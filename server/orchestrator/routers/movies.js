const route = require('express').Router()
const MoviesController = require('../controllers/movies')

route.get('/', MoviesController.find)
route.post('/', MoviesController.create)
route.put('/:id', MoviesController.update)
route.delete('/:id', MoviesController.delete)

module.exports = route