
/*Sweet Alert*/
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const ADD_MOVIE_FAVORITE = "ADD_MOVIE_FAVORITE";
export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE";

const API_KEY = "c844c7d5";



//http://www.omdbapi.com/?apikey=c844c7d5&s=avatar
//http://www.omdbapi.com/?apikey=c844c7d5&i=${id}
const MySwal = withReactContent(Swal);




export function getMovies(title) {
  return async function (dispatch) {

    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    const json = await response.json();

    if(json.Response === "True"){
      dispatch({ type: GET_MOVIES, payload: json });
    }else{
      MySwal.fire({
        title: "the movie doesn´t exist",
        footer: "Movie App - maxsolfar",
        width: 600,
        icon: "info",
        iconColor: "#686BCC",
        padding: "1em",
        color: "#686BCC",
      });
    }
    
  };
}

export function getMovieDetail(id) {
  return async function (dispatch) {
    if (id) {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        const json = await response.json();
        if(json.Response === "False"){
            dispatch({ type: GET_MOVIE_DETAIL, payload: null });
        }
        else{
            dispatch({ type: GET_MOVIE_DETAIL, payload: json });   
        }
        
      } catch {
        dispatch({ type: GET_MOVIE_DETAIL, payload: null });
      }
    } else {
      dispatch({ type: GET_MOVIE_DETAIL });
    }
  };
}

export function addMovieFavorite(movie) {
  return {
    type: ADD_MOVIE_FAVORITE,
    payload: movie,
  };
}

export function removeMovieFavorite(id) {
  return {
    type: REMOVE_MOVIE_FAVORITE,
    payload: id,
  };
}
