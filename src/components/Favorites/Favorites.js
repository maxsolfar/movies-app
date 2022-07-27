import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import addFavorite from '../../img/favorite.svg';

import { removeMovieFavorite } from '../../actions';

/*
  ? LOCALSTORAGE
*/
const nameStorage = "movies-app";
/* const moviesLocalStorage = JSON.parse(localStorage.getItem(nameStorage)); */

export class ConnectedList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: false,
    };
  }
  /*
  * Component Did Mount
  */ 
  componentDidMount() {
    /* if(localStorage.getItem(nameStorage)){
      this.props.favs.length === 0 && moviesLocalStorage.map(movie => this.props.favs.push(movie));
      this.setState({ favorites: true });
    } */
    this.setState({ favorites: true });
  }
  
  render() {
    return (
      
      <div className={styles.Container}>

        <h2 className={styles.Title}>Favorite Movies</h2>
        <ul className={styles.Movies}>

          {this.props.favs.length === 0 && 
          <div className={styles.newFavorite}>
            <img src={addFavorite} alt="favorites"/>
            <h5>Add your favorite movies here...</h5>
          </div>
          }
          {
            this.state.favorites &&
           this.props.favs.map((movie) => (
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
                  className={styles.buttonFav2}
                  onClick={() => {
                    this.props.removeMovieFavorite(movie.imdbID);
                    let removeID = movie.imdbID;
                    localStorage.setItem(nameStorage, JSON.stringify(this.props.favs.filter(movie=> movie.imdbID !== removeID)));
                  }}
                  /* disabled={this.props.favs.find(
                    ({ imdbID }) => imdbID === movie.imdbID
                  )} */
                >
                  <svg width="20px" height="20px" viewBox="0 0 30 27"
                  fill="#ffffff">
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/>
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
                
           ))
         }
        </ul>
      </div>
    );
  }
}






export default connect((state) => ({ favs: state.moviesFavorites}), {removeMovieFavorite})(ConnectedList);

/* <li key={movie.imdbID}>
                <span>{movie.Title}</span>
                <button onClick={() => this.props.removeMovieFavorite(movie.imdbID)}
                >X</button>
             </li>
 */