import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import FooterComponent from '../footer/FooterComponent';
import MainHeaderComponent from '../header/MainHeaderComponent';


const ProductComponent = ()=> {

    if(payload && payload.page == '404') {
        return <NoMatchComponent />
    }

    let matchParams = useParams();

    return(
        <React.Fragment>
            <MainHeaderComponent />
            <div>Product nè</div>

            <FooterComponent/>
        </React.Fragment>
    )
}

export default ProductComponent;