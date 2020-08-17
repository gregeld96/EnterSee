import React, {useState, useEffect} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const ADD_MOVIE = gql`
    mutation AddMovie ($newMovie: NewMovie) {
        addMovie (movie: $newMovie) {
            message
        }
    }
`

const ADD_SERIE = gql`
    mutation AddSeries ($newSeries: NewSeries) {
        addSeries (series: $newSeries) {
            message
        }
    }
`

function AddForm () {
    const [input, setInput] = useState ({
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
        tags: []
    })

    const [listTag, setTags] = useState([])
    const [genre, setGenre] = useState("Movie")
    const history = useHistory()
    const [AddSeries, {data: SeriesData}] = useMutation(ADD_SERIE)
    const [AddMovie, {data: MovieData}] = useMutation(ADD_MOVIE)

    function handleGenre (event) {
        setGenre(event.target.value)
    }

    useEffect(() => {
        setInput({
            ...input,
            tags: listTag
      })
    }, [listTag])

    function handleTags (event) {
        if (event.key === 'Enter' && event.target.value !== '') {
            setTags([...listTag, event.target.value])
            event.target.value = ""
      }
    }

    function onChange (event) {
        let {name, value} = event.target

        if(name === 'popularity') value = Number(value)
        setInput({
            ...input, 
            [name]: value
        })
    }

    function onSubmit (event) {
        event.preventDefault()
        if(genre === 'Movie') {
            AddMovie({
                variables: {
                    newMovie: input
                }, refetchQueries: ["GETLIST"]
            })
            history.push('/')
            setInput({
                title: '',
                overview: '',
                poster_path: '',
                popularity: '',
                tags: []
          })
        } else if (genre === 'Series'){
            AddSeries({
                variables: {
                    newSeries: input
                }, refetchQueries: ["GETLIST"]
            })
            history.push('/')
            setInput({
                title: '',
                overview: '',
                poster_path: '',
                popularity: '',
                tags: []
          })
        }
    }

    return (
        < div className="container mx-auto my-5">
            <Form>
                <Form.Row className="my-3">
                    <Col>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" defaultValue={input.title} placeholder="Title here..." onChange={onChange} />
                    </Col>
                    <Col>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control name="popularity" defaultValue={input.popularity} placeholder="Put the rating here..." onChange={onChange} />
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" defaultValue={genre} onChange={handleGenre}>
                        <option value="Movie">Movie</option>
                        <option value="Series">Series</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Overview</Form.Label>
                    <textarea className="TextArea" name="overview" type="text" defaultValue={input.overview} placeholder="Description here..." onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Poster Url</Form.Label>
                    <Form.Control name="poster_path" type="text" defaultValue={input.poster_path} placeholder="Your poster url here..." onChange={onChange}/>
                </Form.Group>
            </Form>

            <Form.Label>Tags</Form.Label> <br />
            <div className="border">
                    {
                        input.tags.length > 0 && input.tags.map((tag, index) => (
                            <Form.Label key={index} className="mx-3 my-2">{tag}</Form.Label>
                        ))
                    }
                    <Form.Control className="border-0" type="text" placeholder="The tag here..." onKeyPress={handleTags}/>
            </div>

            <Button className="mt-3" onClick={onSubmit}>Submit</Button>
        </div>
    )
}

export default AddForm