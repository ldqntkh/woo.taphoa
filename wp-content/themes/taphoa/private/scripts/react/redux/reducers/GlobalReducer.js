import {
    SHOW_LOADING
} from '../actions/global_data';

export const GlobalReducer = (globalData = {
    isShowLoading: false
}, action)=> {
    let result = {...globalData};
    switch (action.type) {
        case SHOW_LOADING:
            result.isShowLoading = action.flag;
            return result;
        default:
            return result;
    }
}