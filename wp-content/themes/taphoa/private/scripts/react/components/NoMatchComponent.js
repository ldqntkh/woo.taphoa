import React, { lazy } from 'react';

import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';

class NoMatchComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <React.Fragment>
                <MainHeaderComponent />
                <div>404 nè</div>
                <FooterComponent/>
            </React.Fragment>
        )
    }
}

export default NoMatchComponent;