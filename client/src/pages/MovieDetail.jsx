import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Image, Button, Form, Col } from 'react-bootstrap'
import { useQuery, gql, useMutation } from '@apollo/client'
import DetailCard from '../components/DetailCard'
import Loading from '../components/Loading'
import client, { GET_FAV_ANIME } from '../config/config'

const GET_MOVIE = gql`
    query GETMOVIE($id: ID!) {
        movie (_id: $id) {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

const DELETE_MOVIE = gql`
    mutation DeleteMovie($id: String) {
        deleteMovie(_id: $id){
            message
        }
    }
`

const EDIT_MOVIE = gql`
    mutation EditMovie($id: String, $editMovie: UpdateMovie) {
        updateMovie(_id: $id, movie: $editMovie) {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

function MovieDetail () {
    const { id } = useParams()
    const history = useHistory()
    const [show, setShown] = useState(false)
    const [deleteMovie, {data: deletedData}] = useMutation(DELETE_MOVIE)
    const {data, loading, error} = useQuery(GET_MOVIE, {
        variables: {
            id: `${id}`
        }
    })
    const [editMovie, {data: dataMovie}] = useMutation(EDIT_MOVIE)
    const [listTag, setTags] = useState([])
    const [edit, setEdit] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
        tags: []
    })
    const { data:favs } = useQuery(GET_FAV_ANIME)

    function handleDelete (id) {
        deleteMovie({
            variables: {
                id: id
            }, refetchQueries: ['GETLIST']
        })
        history.push('/')
    }

    useEffect(() => {
        if(data) {
            setEdit({
                title: data.movie.title,
                overview: data.movie.overview,
                poster_path: data.movie.poster_path,
                popularity: data.movie.popularity,
                tags: data.movie.tags
            })
            setTags(data.movie.tags)
        }
    }, [show])

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
        editMovie({
            variables: {
                id: id,
                editMovie: edit
            }, refetchQueries: ['GETMOVIE']
        })
        setEdit({
            title: '',
            overview: '',
            poster_path: '',
            popularity: '',
            tags: []
        })
        setShown(false)
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
        disabled = favs.favAnime.filter(fav => fav._id === data.movie._id)
    }

    if(loading) return (<Loading />)
    if(error) return(<h1>{error.message}</h1>)
    else {
        return (
          <>
            <div className="d-flex text-center container mx-auto my-5 border">
                <div className="my-auto">
                    <Image src={data.movie.poster_path}/>
                </div>
                <div className="m-3 my-auto">
                    <DetailCard input={data.movie} />
                    <div className="d-flex">
                        <Button onClick={() => handleDelete(id)}>Delete</Button>
                        <Button onClick={() => handleEdit()}>Edit</Button>
                        {
                          !disabled.length && <Button onClick={() => handleFavorite(data.movie)}>Favorite</Button>
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
                         <textarea className="TextArea" name="overview" type="text" defaultValue={edit.overview} placeholder="Description here..." onChange={onChange} />
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

export default MovieDetail