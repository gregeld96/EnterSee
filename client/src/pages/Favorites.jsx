import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_FAV_ANIME } from '../config/config'
import Card from '../components/Card'
import { Row, Col } from 'react-bootstrap'


function Favorites () {
    const { data, loading, error } = useQuery(GET_FAV_ANIME)

    return (
        <>
            <h1 className="Title">Your Favorite Anime</h1>
            <Row lg={4} md={3} className="m-5 justify-content-center">
            {
                data.favAnime && data.favAnime.map((fav, index) => (
                    <Col key={index}>
                        <Card  input={fav} />
                    </Col>            
                ))
            }
            </Row>
        </>
    )
}

export default Favorites