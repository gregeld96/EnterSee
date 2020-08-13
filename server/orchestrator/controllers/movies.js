const axios = require('axios')
const redis = require('../redis')

class MoviesController {
    static async find (req, res) {
        try {
            const cache = await redis.get('movies')
            if(cache) {
                res.json(JSON.parse(cache))
            } else {
                const {data} = await axios
                .get('http://localhost:3001/movies')
                await redis.set('movies', JSON.stringify(data))
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
                url: "http://localhost:3001/movies",
                data: payload
            }
            const postAdd = await axios(config)

            const {data} = await axios.get('http://localhost:3001/movies')
            await redis.set('movies', JSON.stringify(data))

            res.status(201).json(`Successful added movie`)
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
                url: `http://localhost:3001/movies/${id}`,
                data: payload
            }
            const postUpdate = await axios(config)

            const {data} = await axios.get('http://localhost:3001/movies')
            await redis.set('movies', JSON.stringify(data))

            res.status(201).json(`Successful updated a movie`)
        } catch (err) {
            console.log(err)
        }
    }

    static async delete (req, res) {
        const { id } = req.params
        try {
            const config = {
                method: "DELETE",
                url: `http://localhost:3001/movies/${id}`,
            }
            const postAdd = await axios(config)
            const {data} = await axios.get('http://localhost:3001/movies')
            await redis.set('movies', JSON.stringify(data))

            res.status(200).json(`Successful delete movie`)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = MoviesController