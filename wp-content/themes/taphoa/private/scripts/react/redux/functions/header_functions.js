import {
    SHOW_MENU,
    CART_ITEMS_COUNT,
    SHOW_MIMI_CART
} from '../actions/header_data';


export const TriggerMenuMobile = (flag) => ({
    type : SHOW_MENU,
    data : flag
});

export const SetCartItemCount = (total) => ({
    type : CART_ITEMS_COUNT,
    data : total
});

export const TriggerShowMiniCart = (flag) => ({
    type : SHOW_MIMI_CART,
    data : flag
});
