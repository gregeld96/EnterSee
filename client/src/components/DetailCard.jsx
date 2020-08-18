import React from 'react'
import { Badge } from 'react-bootstrap'
import Rating from 'react-rating';

function DetailCard ({input}) {
    return (
        <>
            <div className="d-flex container">
                <h5 className="px-1 m-5 mx-auto">{input.title}</h5>
                <h5 className="my-auto ml-auto" style={{width: '200px'}}>{input.popularity} <Rating
                    start={0}
                    stop={5}
                    step={1}
                    readonly="false"
                    emptySymbol="far fa-star fa-1x"
                    fullSymbol="fa fa-star fa-1x"
                    initialRating={(input.popularity/2)}
                /></h5>
            </div>
            <p className="p-3">{input.overview}</p>
            <div className="d-flex container">
                {
                    input.tags.map((tag,index) => (
                    <h4 key={index} className="mx-auto"><Badge variant="secondary" >{tag}</Badge></h4>
                    ))
                }
            </div>
        </>
    )
}

export default DetailCard