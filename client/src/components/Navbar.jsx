import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Navigation () {
    const history = useHistory()

    function toPage (page) {
        if(page === 'home') {
            history.push('/')
        } else if (page === 'movies') {
            history.push('/movies')
        } else if (page === 'series') {
            history.push('/series')
        } else if (page === 'add') {
            history.push('/add')
        } else if (page === 'favorites') {
            history.push('/favorites')
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => toPage('home')}>ENTERTAIN ME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav >
                            <Nav.Link onClick={() => toPage('movies')}>Movie</Nav.Link>
                            <Nav.Link onClick={() => toPage('series')}>Series</Nav.Link>
                            <Nav.Link onClick={() => toPage('favorites')}>Favorite</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => toPage('add')}>Add New</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    )
} 

export default Navigation