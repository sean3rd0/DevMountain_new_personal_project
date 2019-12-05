import {createStore, applyMiddleware, combineReducers} from "redux"
import promiseMiddleware from "redux-promise-middleware"
import reducer from "./reducers/reducer"

const rootReducer = combineReducers({
    reducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))