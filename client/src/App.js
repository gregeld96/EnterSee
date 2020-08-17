import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Home,
  Movie,
  Series,
  SerieDetail,
  MovieDetail,
  Form,
  Favorites
} from './pages'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/series/:id">
            <SerieDetail />
          </Route>
          <Route exact path="/add">
            <Form />
          </Route>
          <Route exact path="/movies">
            <Movie />
          </Route>
          <Route exact path="/series">
            <Series />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
