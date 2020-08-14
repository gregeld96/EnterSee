const route = require('express').Router()
const MovieController = require('../controllers/movie')

route.get('/movies', MovieController.find)
route.get('/movies/:id', MovieController.findOne)
route.post('/movies', MovieController.create)
route.put('/movies/:id', MovieController.updateMovie)
route.delete('/movies/:id', MovieController.deleteMovie)

module.exports = route