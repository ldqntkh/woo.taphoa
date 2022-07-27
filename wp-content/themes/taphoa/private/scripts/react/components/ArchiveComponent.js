import React, { lazy } from 'react';
import { useParams } from 'react-router-dom';

import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';

const NoMatchComponent = lazy(()=> import('./NoMatchComponent'));


const ArchiveComponent = ()=> {

    
    
    if(payload && payload.page == '404') {
        return <NoMatchComponent />
    }

    let matchParams = useParams();

    return(
        <React.Fragment>
            <MainHeaderComponent/>
            <div>Archive</div>
            <FooterComponent/>
        </React.Fragment>
    )
}

export default ArchiveComponent;