import {
    SHOW_MENU,
    CART_ITEMS_COUNT,
    SHOW_MIMI_CART
} from '../actions/header_data';

export const HeaderReducer = (headerData = {
    isShowMenu: false,
    isShowMiniCart: false,
    cart_items_count: 0
}, action)=> {
    let result = {...headerData};
    
    switch (action.type) {
        case SHOW_MENU:
            result.isShowMenu = typeof action.data != 'undefined' ? action.data : !result.isShowMenu;
            return result;
        case CART_ITEMS_COUNT:
            result.cart_items_count = action.data >= 1 ? action.data : 1
            return result;
        case SHOW_MIMI_CART:
            console.log(action)
            result.isShowMiniCart = action.data
            return result;
        default:
            return result;
    }
}