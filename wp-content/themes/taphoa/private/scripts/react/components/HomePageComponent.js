import React, { lazy } from 'react';

const MainHeaderComponent = lazy(()=> import('./header/MainHeaderComponent'));
const FooterComponent = lazy(()=> import('./footer/FooterComponent'));

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

export default HomePageComponent;