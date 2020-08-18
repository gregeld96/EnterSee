import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Image, Button, Form, Col } from 'react-bootstrap'
import { useQuery, gql, useMutation } from '@apollo/client'
import Loading from '../components/Loading'
import DetailCard from '../components/DetailCard'
import client, { GET_FAV_ANIME } from '../config/config'
import Validation from '../hooks/Validation'
import Modal from '../components/Modal'

const GET_SERIE = gql`
    query GETSERIE($id: ID!) {
        serie (_id: $id) {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

const DELETE_SERIE = gql`
    mutation DeleteSeries ($id: String) {
        deleteSeries (_id: $id) {
            message
        }
    }
`

const EDIT_SERIE = gql`
    mutation EditSerie($id: String, $editSeries: UpdateSeries) {
        updateSeries(_id: $id, series: $editSeries) {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

function Detail () {
    const { id } = useParams()
    const history = useHistory()
    const [show, setShown] = useState(false)
    const [deleteSeries, {data: deletedData}] = useMutation(DELETE_SERIE)
    const {data, loading, error} = useQuery(GET_SERIE, {
        variables: {
            id: `${id}`
        }
    })
    const [editSeries, {data: dataSeries}] = useMutation(EDIT_SERIE)
    const [listTag, setTags] = useState([])
    const [edit, setEdit] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
        tags: []
    })
    const { data:favs } = useQuery(GET_FAV_ANIME)
    const [message, setMessage] = useState('')

    function handleDelete (id) {
        deleteSeries({
            variables: {
                id: id
            }, refetchQueries: ['GETLIST']
        })
        history.push({
            pathname: '/',
            state: 'Data deleted'
        })
    }

    useEffect(() => {
        if(data) {
            setEdit({
                title: data.serie.title,
                overview: data.serie.overview,
                poster_path: data.serie.poster_path,
                popularity: data.serie.popularity,
                tags: data.serie.tags
            })
            setTags(data.serie.tags)
        }
    }, [data])

    useEffect(() => {
        setEdit({
            ...edit,
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
        setEdit({
            ...edit, 
            [name]: value
        })
    }

    function handleEdit () {
        if(!show) {
            setShown(true)
        } else {
            setShown(false)
        }
    }

    function removeTag (index) {
        setTags([...listTag.filter(tag => listTag.indexOf(tag) !== index)])
            setEdit({
                ...edit,
                tags: listTag
            })
    }

    function onSubmit (event) {
        event.preventDefault()
        const result = Validation(edit)

        if(result.length > 0) {
            let message = String(result)
            setMessage(message)
        } else {
            editSeries({
                variables: {
                    id: id,
                    editSeries: edit
                }, refetchQueries: ['GETSERIE']
            })
            setShown(false)
        }
    }

    function handleFavorite (newAnime) {
        const {favAnime} = client.readQuery({ query: GET_FAV_ANIME})
        client.writeQuery({
            query: GET_FAV_ANIME,
            data: {
                favAnime: [
                    ...favAnime,
                    newAnime
                ]
            }
        })
    }

    let disabled = ""

    if(data){
        disabled = favs.favAnime.filter(fav => fav._id === data.serie._id)
    }

    if(loading) return (<Loading />)
    if(error) return(<h1>{error.message}</h1>)
    else {
        return (
            <>
                {
                    message.length > 0 && <Modal message={message} removeMessage={() =>setMessage('')}/>
                }
                <div className="d-flex text-center container mx-auto my-5 border">
                    <div className="my-auto">
                        <Image src={data.serie.poster_path}/>
                    </div>
                    <div className="m-3">
                        <DetailCard input={data.serie} />
                        <div className="d-flex justify-content-center mt-3">
                            <Button size="sm" className="m-2" onClick={() => handleDelete(id)}>Delete</Button>
                            <Button size="sm" className="m-2" onClick={() => handleEdit()}>Edit</Button>
                            {
                                !disabled.length && <Button size="sm" className="m-2" onClick={() => handleFavorite(data.serie)}>Favorite</Button>
                            }
                        </div>
                    </div>
                </div>
                { show &&
                    <div className="container mx-auto my-5">
                    <Form>
                        <Form.Row className="my-3">
                            <Col>
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" defaultValue={edit.title} placeholder="Title here..." onChange={onChange} />
                            </Col>
                            <Col>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control name="popularity" defaultValue={edit.popularity} placeholder="Put the rating here..." onChange={onChange} />
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Overview</Form.Label><br />
                            <Form.Control as="textarea" style={{height: '200px'}} name="overview" type="text" defaultValue={edit.overview} placeholder="Description here..." onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster Url</Form.Label>
                            <Form.Control name="poster_path" type="text" defaultValue={edit.poster_path} placeholder="Your poster url here..." onChange={onChange}/>
                        </Form.Group>
                    </Form>
                    <Form.Label>Tags</Form.Label> <br />
                    <div className="border">
                            {
                                edit.tags.length > 0 && edit.tags.map((tag, index) => (
                                    <Form.Label key={index} className="mx-3 my-2">{tag}<p onClick={() => removeTag(index)}>x</p></Form.Label>
                                ))
                            }
                            <Form.Control className="border-0" type="text" placeholder="The tag here..." onKeyPress={handleTags}/>
                    </div>
                    <Button className="mt-3" onClick={onSubmit}>Submit</Button>
                    </div>
                }
            </>
        )
    }
}

export default Detail