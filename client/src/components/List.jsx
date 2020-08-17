import React from 'react'
import Card from '../components/Card'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function List ({list}) {
    const history = useHistory()

    function toDetail (type, id) {
        if(type === 'Movie'){
            history.push(`/movies/${id}`)
        } else if (type === 'Series') {
            history.push(`/series/${id}`)
        }
    }

    return (
        <Row className="m-5 justify-content-center" md={3} lg={4}>
            {
                list.length > 0 && list.map(data => (
                    <Col key={data._id} onClick={() => toDetail(data.__typename, data._id)} className="mt-2">
                        <Card input={data} />
                    </Col>
                ))
            }
        </Row>
    )
}

export default List
