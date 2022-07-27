import React, { lazy } from 'react';

import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';


class HomePageComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <React.Fragment>
                <MainHeaderComponent />

                <FooterComponent/>
            </React.Fragment>
        )
    }
}

export default HomePageComponent