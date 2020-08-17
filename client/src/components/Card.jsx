import React, {useState} from 'react'
import { Image } from 'react-bootstrap'

function Card ({input}) {
    const [isShown, setIsShown] = useState(false)
    
    return (
        <div className="card"
             onMouseEnter={() => setIsShown(true)}
             onMouseLeave={() => setIsShown(false)}
        >
            <Image height="320px" src={input.poster_path} />
            { isShown && (
                <div className="overlay">
                    <p>{input.title}</p>
                    <h5><i className="fas fa-star mx-2" />{input.popularity}</h5>
                </div>
              )
            }
        </div>
    )
}

export default Card