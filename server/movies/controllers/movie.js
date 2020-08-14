const Movie = require('../models/movie')

class MovieController {
    static find (req, res) {
        Movie.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static findOne (req, res) {
        const { id } = req.params

        Movie.findOne(id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(`Internal Server Error`)
            console.log(err)
        })
    }

    static create(req, res) {
        const newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        Movie.create(newMovie)
        .then(({ops}) => {
            res.status(201).json(ops[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
            console.log(err)
        })
    }

    static updateMovie (req, res) {
        const { id } = req.params
        const { title, overview, popularity, poster_path, tags} = req.body

        if (!title || !overview || !popularity || !poster_path || !tags.length) res.status(400).json(`Fill up whole`)
        else {
            Movie.update(id, { title, overview, popularity, poster_path, tags})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    static deleteMovie (req, res) {
        const { id } = req.params

        Movie.delete(id)
        .then(result => {
            res.status(200).json(`Movie successful deleted`)
        })
        .catch(err => {
            console.log(err)
        })
    }

}

module.exports = MovieController