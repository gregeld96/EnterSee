import React from 'react'
import { Badge } from 'react-bootstrap'
import Rating from 'react-rating';

function DetailCard ({input}) {
    return (
        <>
            <div className="d-flex container">
                <h3 className="px-1 my-auto">{input.title}</h3>
                <Rating className="my-auto ml-auto"
                    start={0}
                    stop={5}
                    step={1}
                    readonly="false"
                    emptySymbol="far fa-star fa-1x"
                    fullSymbol="fa fa-star fa-1x"
                    initialRating={(input.popularity/2)}
                />
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