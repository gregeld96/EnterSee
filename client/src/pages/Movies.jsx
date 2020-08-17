import React from 'react'
import { useQuery, gql } from '@apollo/client'
import List from '../components/List'
import Loading from '../components/Loading'

const GET_LIST = gql`
    query GETLIST {
        movies {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

export default function Movies () {
    const {data, loading, error} = useQuery(GET_LIST)
    
    if(loading) return (<Loading />)
    if(error) return(<h1>{error.message}</h1>)
    return (
        <>
            <h1 className="Title">Movies</h1>
                {
                    data && <List list={data.movies} />
                }
        </>
    )
}