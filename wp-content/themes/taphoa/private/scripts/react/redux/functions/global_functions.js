import {
    SHOW_LOADING
} from '../actions/global_data';


export const TriggerLoading = (flag) => {
    return ({
        type : SHOW_LOADING,
        flag
    })
};
