import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../../actions/index';

import styles from './Movie.module.css';

class Movie extends React.Component {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getMovieDetail(id);
    }

    componentWillUnmount(){
        this.props.getMovieDetail();
    }

    render() {
  
        return (
          <div className="movie-detail">
            <h2 className={styles.Title}>Movie Details</h2>
            <hr className={styles.TitleSeparator}></hr>
            {this.props.movies === undefined ? (
              <>
                <h2>Loading...</h2>
              </>
            ) : this.props.movies === null ? (
              <>
                <h2>Movie not found...</h2>
              </>
            ) : (
              <div className={styles.Container}>
                <div className={styles.Details1}>
                  <img src={this.props.movies.Poster} alt="img-movie" />
                  <div className={styles.TitleMovie}>
                    <h2>{this.props.movies.Title} </h2>
                    <b>{this.props.movies.Rated}</b>
                  </div>
                  <div className={styles.Runtime}>
                    <span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 64 64"
                        fill="#a7a2b1"
                      >
                        <path d="M 32 6 C 17.641 6 6 17.641 6 32 C 6 46.359 17.641 58 32 58 C 46.359 58 58 46.359 58 32 C 58 17.641 46.359 6 32 6 z M 32 10 C 44.15 10 54 19.85 54 32 C 54 44.15 44.15 54 32 54 C 19.85 54 10 44.15 10 32 C 10 19.85 19.85 10 32 10 z M 30.5 14 L 31 18 L 33 18 L 33.5 14 L 30.5 14 z M 44.021484 18.564453 L 33.25 28.203125 A 4 4 0 0 0 32 28 A 4 4 0 0 0 32 36 A 4 4 0 0 0 32.722656 35.931641 L 40.816406 42.638672 L 42.640625 40.816406 L 35.931641 32.720703 A 4 4 0 0 0 35.796875 30.75 L 45.435547 19.978516 L 44.021484 18.564453 z M 14 30.5 L 14 33.5 L 18 33 L 18 31 L 14 30.5 z M 50 30.5 L 46 31 L 46 33 L 50 33.5 L 50 30.5 z M 31 46 L 30.5 50 L 33.5 50 L 33 46 L 31 46 z" />
                      </svg>
                      {`Runtime: ${this.props.movies.Runtime}`}
                    </span>

                    <span>
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 329.942 329.942"
                        fill="#fbc02d"
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
                      {`${this.props.movies.imdbRating} (IMDb)`}
                    </span>
                  </div>

                  <hr></hr>

                  <div className={styles.Gnere}>
                    <span className={styles.GnereSpan}>Genre:</span>
                    <div className={styles.GnereTitle}>
                      {this.props.movies.Genre.split(",").map((genre) => (
                        <span className={styles.GnereType}>{genre}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.Details2}>
                  <span className={styles.Plot}>{this.props.movies.Plot}</span>
                  <div className={styles.Text}>
                    <hr></hr>
                    <span>
                      <b>Writer: </b>
                      {`${this.props.movies.Writer}`}
                    </span>
                    <hr></hr>
                    <span>
                      <b>Director: </b>
                      {`${this.props.movies.Director}`}
                    </span>
                    <hr></hr>
                    <span>
                      <b>Actors: </b>
                      {`${this.props.movies.Actors}`}
                    </span>
                    <hr></hr>
                    <span>
                      <b>Awards: </b>
                      {`${this.props.movies.Awards}`}
                    </span>
                    <hr></hr>

                    <span className={styles.GnereSpan}>Raitings:</span>
                  </div>

                  
                  <div className={styles.RatingsContainer}>
                    {this.props.movies.Ratings.map((raiting) => (
                      <div className={styles.Rating}>
                        <span>
                          <svg
                            width="22px"
                            height="22px"
                            viewBox="0 0 329.942 329.942"
                            fill="#fbc02d"
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
                          {`${raiting.Source} ${raiting.Value}`} 
                          
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
}



export default connect((state) => ({movies: state.movieDetail}),{getMovieDetail})(Movie);