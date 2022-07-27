import {
    GET_MOVIES,
    GET_MOVIE_DETAIL,
    ADD_MOVIE_FAVORITE,
    REMOVE_MOVIE_FAVORITE
} from '../actions';


const initialState = {
    moviesFavorites: [],
    moviesLoaded: [],
    movieDetail: undefined
};

function movieReducer(state = initialState, action){
    switch(action.type){
        case GET_MOVIES:
        return{
            ...state,
            moviesLoaded: action.payload.Search
        };
        case ADD_MOVIE_FAVORITE:
        return{
            ...state,
            moviesFavorites: [...state.moviesFavorites, action.payload]
        };
        case REMOVE_MOVIE_FAVORITE:
        return{
            ...state,
            moviesFavorites: state.moviesFavorites.filter(({imdbID}) => imdbID !== action.payload)
        };
        case GET_MOVIE_DETAIL:
        return{
            ...state, movieDetail: action.payload
        };
        default: return state;
    }
}

export default movieReducer;