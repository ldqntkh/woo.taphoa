import React from 'react';
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const SlickComponent = ({slickConfig, sliderData})=> {
      return (
        <div>
            <Slider {...slickConfig}>
                {
                    sliderData.map((item)=> {
                        return(
                            <div className='slider-item' key={uuidv4()}>
                                <Link to={item.url}>
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