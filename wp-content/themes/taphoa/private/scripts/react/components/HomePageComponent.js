import axios from 'axios';
import React, { lazy } from 'react';

import { AJAX_URL } from '../variables/constants';

import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';
const SlickComponent =  lazy(()=>import('./share/SlickComponent'));
const AdsImageComponent = lazy(()=> import('./share/AdsImageComponent'));
const HomeListProductComponent = lazy(()=> import('./home/HomeListProductComponent'));



class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homepage_data: {}
        }
    }

    async componentDidMount() {
        await this._loadHeader()
    }

    _loadHeader = async()=> {
        
        try {
            let flag = false;
            // get data từ sessionStorage
            if( typeof config_home != 'undefined' ) {
                this.setState({homepage_data: config_home});
                flag = true;
            }

            if( !flag ) {
                let sessionStorageKey = 'homepage_data';
                let homepage_data = sessionStorage.getItem( sessionStorageKey );
                if( homepage_data ) {
                    homepage_data = JSON.parse(homepage_data);
                    this.setState(homepage_data);
                } else {
                    // fetch from server to check version
                    let response = await axios.get( AJAX_URL, {
                        params: {
                            'homepage-ajax': true
                        }
                    } );
                    if( response.data.success ) {
                        let responseData = response.data.data;
                        if( responseData.version != this.state.version ) {
                            this.setState({homepage_data: responseData});
                            // ghi vào sessionStorage
                            sessionStorage.setItem( sessionStorageKey, JSON.stringify(responseData) )
                        }
                        
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        let {
            homepage_data
        } = this.state;

        let keys = Object.keys(homepage_data);
        
        return(
            <React.Fragment>
                <MainHeaderComponent />
                {
                    keys.map( (key) => {
                        let _key = key.split('_')[0];
                        switch(_key) {
                            case "slider-top":
                                return <SlickComponent key={key} slickConfig={{
                                    dots: false,
                                    infinite: true,
                                    speed: 500,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true,
                                    autoplaySpeed: 4000
                                }} 
                                    sliderData={homepage_data[key]}
                                />
                                return;
                            case "ads":
                                return <AdsImageComponent key={key} adsData={homepage_data[key]} />;
                            case "cat":
                                return <HomeListProductComponent key={key} dataProducts={homepage_data[key]} />
                        }
                    } )
                }
                <FooterComponent/>
            </React.Fragment>
        )
    }
}

export default HomePageComponent