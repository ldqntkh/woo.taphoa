import { createStore } from 'redux';

// import reducer
import AppReducer from '../reducers/IndexReducers'

export const AppStore = createStore(AppReducer);