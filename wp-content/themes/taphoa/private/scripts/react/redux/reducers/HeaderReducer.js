import {
    SHOW_MENU
} from '../actions/header_data';

export const HeaderReducer = (headerData = {
    isShowMenu: false
}, action)=> {
    let result = {...headerData};
    switch (action.type) {
        case SHOW_MENU:
            result.isShowMenu = typeof action.data != 'undefined' ? action.data : !result.isShowMenu;
            return result;
        default:
            return result;
    }
}