import React from 'react';
import { Link } from 'react-router-dom';

const AdsImageComponent = ({adsData})=> {
    
    return(
        <div className={`container ads-container ${adsData.title != '' && 'has-title'}`}>
            {
                adsData.title &&
                <div className='header'>
                    <h3>{adsData.title}</h3>
                </div>
            }
            <div className='content'>
                <Link onClick={()=> {
                                    window.payload = item.payload;
                                    document.title = item.payload.title
                                }} 
                    to={adsData.url}>
                    <img src={adsData.image_url} alt={adsData.title} />
                </Link>
            </div>
        </div>
    )
}

export default AdsImageComponent;