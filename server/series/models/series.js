const db = require("../config/config.js")
const Series = db.collection("series")
const { ObjectId } = require("mongodb")

class SeriesModel {
    static find () {
        return Series.find().toArray()
    }

    static findOne (id) {
        return Series.findOne({_id: ObjectId(id)})
    }

    static create(newSeries) {
        return Series.insertOne(newSeries)
    }

    static update(id, updatedSeries) {
        return Series.updateOne({_id: ObjectId(id)}, {$set: updatedSeries})
    }

    static delete (id) {
        return Series.deleteOne({_id: ObjectId(id)})
    }
}

module.exports = SeriesModel