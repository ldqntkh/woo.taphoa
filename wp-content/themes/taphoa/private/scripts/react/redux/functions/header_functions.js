import {
    SHOW_MENU
} from '../actions/header_data';


export const TriggerMenuMobile = (flag) => ({
    type : SHOW_MENU,
    data : flag
});
