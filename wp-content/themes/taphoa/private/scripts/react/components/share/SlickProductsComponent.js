import React from 'react';

import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductItemComponent from './ProductItemComponent';

const SlickProductsComponent = ({lstProduct}) => {
    const slickConfig = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }
    
    return(
        <Slider {...slickConfig}>
            {
                lstProduct.map((product)=> {
                    return(
                        <ProductItemComponent product={product} key={uuidv4()} />
                    )
                })
            }
        </Slider>
    )
}

export default SlickProductsComponent;