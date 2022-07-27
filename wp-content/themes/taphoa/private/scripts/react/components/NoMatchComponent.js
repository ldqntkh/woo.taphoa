import React, { lazy } from 'react';

const MainHeaderComponent = lazy(()=> import('./header/MainHeaderComponent'));
const FooterComponent = lazy(()=> import('./footer/FooterComponent'));

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