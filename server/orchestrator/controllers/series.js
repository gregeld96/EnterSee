const axios = require('axios')
const redis = require('../redis')

class SeriesController {
    static async find (req, res) {
        try {
            const cache = await redis.get('series')
            if(cache) {
                res.json(JSON.parse(cache))
            } else {
                const {data} = await axios
                .get('http://localhost:3002/series')
                await redis.set('series', JSON.stringify(data))
                res.json(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async create (req, res) {
        const {title, overview, popularity, poster_path, tags} = req.body
        try {
            const payload = { title, overview, popularity, poster_path, tags }
            const config = {
                method: "POST",
                url: "http://localhost:3002/series",
                data: payload
            }
            const postAdd = await axios(config)

            const {data} = await axios.get('http://localhost:3002/series')
            await redis.set('series', JSON.stringify(data))

            res.status(201).json(`Successful added series`)
        } catch (err) {
            console.log(err)
        }
    }

    static async update (req, res) {
        const { id } = req.params
        const {title, overview, popularity, poster_path, tags} = req.body

        try {
            const payload = { title, overview, popularity, poster_path, tags }
            const config = {
                method: "PUT",
                url: `http://localhost:3002/series/${id}`,
                data: payload
            }
            const postUpdate = await axios(config)

            const {data} = await axios.get('http://localhost:3002/series')
            await redis.set('series', JSON.stringify(data))

            res.status(201).json(`Successful updated a series`)
        } catch (err) {
            console.log(err)
        }
    }

    static async delete (req, res) {
        const { id } = req.params
        try {
            const config = {
                method: "DELETE",
                url: `http://localhost:3002/series/${id}`,
            }
            const postAdd = await axios(config)
            const {data} = await axios.get('http://localhost:3002/series')
            await redis.set('series', JSON.stringify(data))

            res.status(200).json(`Successful delete series`)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = SeriesController