const Series = require('../models/series')

class SeriesController {
    static find (req, res) {
        Series.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(`Internal Server Error`)
            console.log(err)
        })
    }

    static create(req, res) {
        const {title, overview, popularity, poster_path, tags} = req.body

        if (!title || !overview || !popularity || !poster_path || !tags.length) res.status(400).json(`Fill up whole`)
        Series.create({ title, overview, popularity, poster_path, tags})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
            console.log(err)
        })
    }

    static update (req, res) {
        const { id } = req.params
        const { title, overview, popularity, poster_path, tags} = req.body

        if (!title || !overview || !popularity || !poster_path || !tags.length) res.status(400).json(`Fill up whole`)
        else {
            Series.update(id, { title, overview, popularity, poster_path, tags})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    static delete (req, res) {
        const { id } = req.params

        Series.delete(id)
        .then(result => {
            res.status(200).json(`Series successful deleted`)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = SeriesController