import {combineReducers} from 'redux';

// import reducer
import { HeaderReducer } from './HeaderReducer';
import { GlobalReducer } from './GlobalReducer';

let AppReducer = combineReducers({
    HeaderReducer,
    GlobalReducer
});

export default AppReducer;