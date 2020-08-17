import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache
});

export const GET_FAV_ANIME = gql`
    query {
        favAnime @client {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

client.writeQuery({
    query: GET_FAV_ANIME,
    data: {
        favAnime: []
    }
})

export default client