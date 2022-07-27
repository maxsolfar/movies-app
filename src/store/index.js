import { createStore, applyMiddleware, compose } from "redux";
import movieReducer from "../reducers/index";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(movieReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;