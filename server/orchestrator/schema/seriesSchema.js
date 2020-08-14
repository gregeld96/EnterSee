const axios = require('axios')
const { gql } = require('apollo-server')
const redis = require('../redis')

const typeDefs = gql`
    type Series {
        _id: ID
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    type SeriesMessage {
        message: String
    }

    extend type Query {
        series: [Series]
        serie(_id: ID!): Series
    }

    input NewSeries {
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    input SeriesId {
        _id: ID
    }

    input UpdateSeries {
        title: String
        overview: String
        popularity: Float
        poster_path: String
        tags: [String]
    }

    extend type Mutation {
        addSeries(series: NewSeries) : SeriesMessage
        deleteSeries(series: SeriesId) : SeriesMessage
        updateSeries(id: SeriesId, series:UpdateSeries) : Series
    }
`

const resolvers = {
    Query: {
        series: async () => {
            const cache = await redis.get('series')
            if(cache) {
                return JSON.parse(cache)
            } else {
                const config = {
                    method: 'GET',
                    url: 'http://localhost:3002/series'
                }
                try {
                    const {data} = await axios(config)
                    await redis.set('series', JSON.stringify(data))
                    return data
                } catch (err) {
                    console.log(err.message)
                }
            }
        },
        serie: async (_,args) => {
            const {_id} = args
            const config = {
                method: 'GET',
                url: `http://localhost:3002/series/${_id}`
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
        addSeries: async (_, args) => {
            const {title, overview, popularity, poster_path, tags} = args.series
            try {
                const payload = { title, overview, popularity, poster_path, tags }
                const config = {
                    method: 'POST',
                    url: 'http://localhost:3002/series',
                    data: payload
                }
                await axios(config)

                const {data} = await axios.get('http://localhost:3002/series')
                await redis.set('series', JSON.stringify(data))

                return {message: `Success added`}
            } catch (err) {
                console.log(err.message)
            }
        },
        deleteSeries: async (_, args) => {
            const {_id} = args.series
            try {
                const config = {
                    method: 'DELETE',
                    url: `http://localhost:3002/series/${_id}`
                }
                await axios(config)

                const {data} = await axios.get('http://localhost:3002/series')
                await redis.set('series', JSON.stringify(data))
                return {message: `Success deleted`}
            } catch (err) {
                console.log(err.message)
            }
        },
        updateSeries: async (_, args) => {
            const {title, overview, popularity, poster_path, tags} = args.series
            const {_id} = args.id
            try {
                const payload = { title, overview, popularity, poster_path, tags }
                const url = {
                    method: 'PUT',
                    url: `http://localhost:3002/series/${_id}`,
                    data: payload
                }
                const {config} = await axios(url)

                const {data} = await axios.get('http://localhost:3002/series')
                await redis.set('series', JSON.stringify(data))

                return JSON.parse(config.data)
            } catch (err) {
                console.log(err.message)
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}