import React from 'react';
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const SlickComponent = ({slickConfig, sliderData})=> {
    
    let _sliderData = sliderData;
    if( typeof sliderData == 'object' ) {
        var array = Object.keys(sliderData)
                .map(function(key) {
                    return sliderData[key];
                });
        _sliderData = array;
    }
    
    return (
        <div className='container home-slider-top'>
            <Slider {...slickConfig}>
                {
                    _sliderData.map((item)=> {
                        return(
                            <div className='slider-item' key={uuidv4()}>
                                <Link onClick={()=> {
                                    window.payload = item.payload;
                                    document.title = item.payload.title
                                }} to={item.url}>
                                    <img src={item.image_url} alt={item.title} />
                                </Link>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default SlickComponent;