const axios = require('axios')
const { gql } = require('apollo-server')
const redis = require('../redis')

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    type MovieMessage {
        message: String
    }

    extend type Query {
        movies: [Movie]
        movie(_id: ID!): Movie
    }

    input NewMovie {
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    input MovieId {
        _id: ID
    }

    input UpdateMovie {
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    extend type Mutation {
        addMovie(movie: NewMovie) : MovieMessage
        deleteMovie(movie: MovieId) : MovieMessage
        updateMovie(id: MovieId, movie:UpdateMovie) : Movie
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            const cache = await redis.get('movies')
            if(cache) {
                return JSON.parse(cache)
            } else {
                const config = {
                    method: 'GET',
                    url: 'http://localhost:3001/movies'
                }
                try {
                    const {data} = await axios(config)
                    await redis.set('movies', JSON.stringify(data))
                    return data
                } catch (err) {
                    console.log(err)
                }
            }
        },
        movie: async (_,args) => {
            const {_id} = args
            const config = {
                method: 'GET',
                url: `http://localhost:3001/movies/${_id}`
            }
            try{
                const { data }= await axios(config)
                return data
            } catch (err) {
                console.log(err.message)
            }
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            const {title, overview, popularity, poster_path, tags} = args.movie
            try {
                const payload = { title, overview, popularity, poster_path, tags }
                const config = {
                    method: 'POST',
                    url: 'http://localhost:3001/movies',
                    data: payload
                }
                await axios(config)

                const {data} = await axios.get('http://localhost:3001/movies')
                await redis.set('movies', JSON.stringify(data))

                return {message: `Success added`}
            } catch (err) {
                console.log(err)
            }

        },
        deleteMovie: async (_, args) => {
            const {_id} = args.movie
            try {
                const config = {
                    method: 'DELETE',
                    url: `http://localhost:3001/movies/${_id}`
                }
                await axios(config)

                const {data} = await axios.get('http://localhost:3001/movies')
                await redis.set('movies', JSON.stringify(data))

                return {message: `Success deleted`}
            } catch (err) {
                console.log(err)
            }
        },
        updateMovie: async (_, args) => {
            const {title, overview, popularity, poster_path, tags} = args.movie
            const {_id} = args.id
            try {
                const payload = { title, overview, popularity, poster_path, tags }
                const url = {
                    method: 'PUT',
                    url: `http://localhost:3001/movies/${_id}`,
                    data: payload
                }
                const {config} = await axios(url)

                const {data} = await axios.get('http://localhost:3001/movies')
                await redis.set('movies', JSON.stringify(data))

                return JSON.parse(config.data)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}