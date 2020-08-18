import React, {useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import List from '../components/List'
import Loading from '../components/Loading'
import { useLocation } from 'react-router-dom'
import Modal from '../components/Modal'

const GET_LIST = gql`
    query GETLIST {
        movies {
            _id
            title
            overview
            popularity
            poster_path
            tags
        },
        series {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

export default function Home () {
    const {data, loading, error } = useQuery(GET_LIST)
    const { state } = useLocation()
    const [message, setMessage] = useState(state)

    if(loading) return (<Loading />)
    if(error) return (<h1>{error.message}</h1>)
    return (
        <>
            {
                message && <Modal message={message} removeMessage={() =>setMessage('')}/>
            }
            <div>
                <div>
                    <h1 className="Title">Movies</h1>
                </div>
                {
                    data && <List list={data.movies} />
                }
            </div>
            <div>
            <div>
                    <h1 className="Title">Series</h1>
                </div>
                {
                    data && <List list={data.series} />
                }
            </div>
        </>
    )
}