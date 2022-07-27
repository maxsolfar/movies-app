import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import styles from './Search.module.css';

import addMovies from '../../img/movies.svg';

import { addMovieFavorite, getMovies } from '../../actions';


/*Sweet Alert*/
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


  /*
  ? LOCALSTORAGE
  */
const nameStorage = "movies-app";

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  /*
   * Component Did Mount
   */

    /* componentDidMount() {
    const moviesLocalStorage = JSON.parse(localStorage.getItem(nameStorage));
      if (localStorage.getItem(nameStorage)) {
        moviesLocalStorage.map((movie) => this.props.addMovieFavorite(movie));
      }
    } */


     /*
  * Component Did Mount
  */ 
  componentDidMount() {
    if(localStorage.getItem(nameStorage)){
      const moviesLocalStorage = JSON.parse(localStorage.getItem(nameStorage));
      this.props.favs.length === 0 && moviesLocalStorage.map(movie => this.props.favs.push(movie));
    }
    console.log(this.props.favs);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
    this.setState({ title: "" });
  }

  onKeyUp = (event) => {
    if (event.charCode === 13) {
      this.props.getMovies(this.state.title);
      this.setState({ title: "" });
    }
  };

  render() {
    const { title } = this.state;

    const MySwal = withReactContent(Swal);

    return (
      <div className={styles.Container}>
        <h2 className={styles.Title}>Search your Movie</h2>

        <div className={styles.inputContainer}>
          <input
            className={styles.Input}
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onKeyPress={this.onKeyUp}
            placeholder="Search..."
            onChange={(e) => this.handleChange(e)}
          />

          <button
            className={styles.inputButton}
            onClick={(e) => this.handleSubmit(e)}
          >
            <svg className={styles.pin} viewBox="0 0 50 50">
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </button>
        </div>

        <ul className={styles.Movies}>
          {this.props.movies.length === 0 && 
          <div className={styles.NewMovies}>
            <img src={addMovies} alt="new-movies"/>
            <h5>Search your favorite movies</h5>
          </div>}
          {this.props.movies &&
            this.props.movies.map((movie) => (
              <li className={styles.MoviesCard} key={movie.imdbID}>
                <div className={styles.ContainerOverlay}>
                  <img
                    className={styles.CardImg}
                    src={movie.Poster}
                    alt={`img-movie-${movie.Title}`}
                  />
                  <Link
                    className={styles.CardTitle2}
                    to={`/movie/${movie.imdbID}`}
                  >
                    {movie.Title}
                  </Link>

                  <div className={styles.CardOverlay}>
                    <button
                      disabled={
                        this.props.favs.find(
                          ({ imdbID }) => imdbID === movie.imdbID
                        )
                          ? true
                          : false
                      }
                      className={styles.buttonFav2}
                      onClick={() => {
                        MySwal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "added to favorites",
                          showConfirmButton: false,
                          color: "#686BCC",
                          iconColor: "#686BCC",
                          timer: 800,
                        });
                        this.props.addMovieFavorite(movie);
                        if(localStorage.getItem(nameStorage)){
                          const moviesLocalStorage = JSON.parse(localStorage.getItem(nameStorage));
                          localStorage.setItem(nameStorage, JSON.stringify([...moviesLocalStorage, movie]));
                        }
                        else{
                          localStorage.setItem(nameStorage,JSON.stringify([movie]));
                        }

                        
                        
                        
                      }}

                      /* disabled={this.props.favs.find(
                    ({ imdbID }) => imdbID === movie.imdbID
                  )} */
                    >
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 329.942 329.942"
                        fill={
                          this.props.favs.find(
                            ({ imdbID }) => imdbID === movie.imdbID
                          )
                            ? "#fbc02d"
                            : "#ffffff"
                        }
                      >
                        <path
                          id="XMLID_16_"
                          d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
                c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
                c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
                c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
                l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
                l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"
                        />
                      </svg>
                    </button>

                    {/* <button
                  className={styles.buttonFav}
                  onClick={() => this.props.addMovieFavorite(movie)}
                  disabled={this.props.favs.find(
                    ({ imdbID }) => imdbID === movie.imdbID
                  )}
                >
                  <svg width="32px" height="32px" viewBox="0 0 329.942 329.942">
                    <path
                      id="XMLID_16_"
                      d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
                c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
                c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
                c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
                l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
                l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"
                    />
                  </svg>
                  Add to Favorites
                </button> */}
                  </div>
                </div>

                <div className={styles.CardInfo}>
                  {/* <Link
                  className={styles.CardTitle}
                  to={`/movie/${movie.imdbID}`}
                >
                  {movie.Title}
                </Link> */}
                  <div className={styles.MovieDetails}>
                    <span className={styles.CardType}>
                      {movie.Type.toUpperCase()}
                    </span>
                    <span className={styles.CardYear}>{movie.Year}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    movies:state.moviesLoaded,
    favs: state.moviesFavorites,
  };
}

function mapDispatchToProps(dispatch){
  return{
    getMovies: title => dispatch(getMovies(title)),
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)), 
  };
}

// arrow function del mapstatetoprops => export default connect((state) => ({movies: state.moviesLoaded}), {getMovies})(Buscador);


//export default connect((state) => ({movies: state.moviesLoaded , favs: state.moviesFavourites}), {getMovies, addMovieFavorite})(Buscador);
export default connect(mapStateToProps, mapDispatchToProps)(Buscador);