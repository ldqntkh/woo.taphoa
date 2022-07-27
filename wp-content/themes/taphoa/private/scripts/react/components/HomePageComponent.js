import axios from 'axios';
import React, { lazy } from 'react';

import { AJAX_URL } from '../variables/constants';

import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';
const SlickComponent =  lazy(()=>import('./share/SlickComponent'));



class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider_top: null
        }
    }

    async componentDidMount() {
        await this._loadHeader()
    }

    _loadHeader = async()=> {
        let sessionStorageKey = 'homepage_data';
        let homepage_data = sessionStorage.getItem( sessionStorageKey );
        try {
            let flag = false;
            // get data từ sessionStorage
            if( homepage_data ) {
                homepage_data = JSON.parse(homepage_data);
                this.setState(homepage_data);
                flag = true;
            }

            if( !flag ) {
                // fetch from server to check version
                let response = await axios.get( AJAX_URL, {
                    params: {
                        'homepage-ajax': true
                    }
                } );
                if( response.data.success ) {
                    let responseData = response.data.data;
                    if( responseData.version != this.state.version ) {
                        this.setState(responseData);
                        // ghi vào sessionStorage
                        sessionStorage.setItem( sessionStorageKey, JSON.stringify(responseData) )
                    }
                    
                }
            }
        } catch (err) {

        }
    }

    render() {
        let {
            slider_top
        } = this.state;

        return(
            <React.Fragment>
                <MainHeaderComponent />
                { 
                    slider_top && 
                    <div className='container home-slider-top'>
                        <SlickComponent slickConfig={{
                            dots: false,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: true,
                            autoplaySpeed: 4000
                        }} 
                        sliderData={slider_top}
                        />
                    </div>
                }
                <FooterComponent/>
            </React.Fragment>
        )
    }
}

export default HomePageComponent