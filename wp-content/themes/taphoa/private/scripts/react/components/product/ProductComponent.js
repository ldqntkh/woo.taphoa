import React from 'react';

import axios from 'axios';

const MainHeaderComponent = lazy(()=> import('../header/MainHeaderComponent'));
const FooterComponent = lazy(()=> import('../footer/FooterComponent'));

class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        
    }

    render() {
        return(
            <React.Fragment>
                <MainHeaderComponent />
                <div>Product nè</div>

                <FooterComponent/>
            </React.Fragment>
        )
    }
}

export default ProductComponent;