import React from "react";

import Favorites from "./components/Favorites/Favorites";
import Search from "./components/Search/Search";
import NavBar from "./components/NavBar/NavBar";

import { Route } from "react-router-dom";
import Movie from "./components/Movie/Movie";

import './App.css';


function App() {
  return (
    <React.Fragment>
      <div className="MainContainer">
        <div className="ContainerLeft">
          <NavBar />
        </div>
        <div className="ContainerRight">
          <Route exact path="/" component={Search} />
          <Route path="/favs" component={Favorites} />
          <Route path="/movie/:id" component={Movie} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
