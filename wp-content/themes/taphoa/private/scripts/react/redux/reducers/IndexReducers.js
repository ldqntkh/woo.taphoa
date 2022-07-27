import {combineReducers} from 'redux';

// import reducer
import { HeaderReducer } from './HeaderReducer';

let AppReducer = combineReducers({
    HeaderReducer
});

export default AppReducer;