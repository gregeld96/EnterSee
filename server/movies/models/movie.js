const db = require("../config/config.js")
const Movie = db.collection("movies")
const { ObjectId } = require("mongodb")

class MovieModel {
    static find () {
        return Movie.find().toArray()
    }

    static create (newMovie) {
        return Movie.insertOne(newMovie)
    }
    
    static update (id, updateMovie) {
        return Movie.updateOne({_id: ObjectId(id)}, {$set: updateMovie})
    }

    static delete (id) {
        return Movie.deleteOne({_id: ObjectId(id)})
    }
}

module.exports = MovieModel