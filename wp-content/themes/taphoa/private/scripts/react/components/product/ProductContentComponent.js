import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { numberWithCommas } from '../../helpers/format';
import { ShowLoading } from '../../helpers/loading';
import axios from 'axios';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { ADMIN_AJAX_URL } from '../../variables/constants';
// redux
// import { SetCartItemCount } from '../../redux/functions/header_functions';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ProductContentComponent = ({ product, setCartItemCount, showMiniCart })=> {
    
    const [showMore, setShowMore] = useState(false);
    const [showPopupImages, setShowPopupImages] = useState(false);
    const [isProductTabImage, setIsProductTabImage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    
    const _showPopupImages = ()=> {
        let images = [];
        if( isProductTabImage ) {
            images.push(product.image);
            if( product.galery && product.galery.length > 0 ) {
                for( let i = 0; i < product.galery.length; i++ ) {
                    images.push(product.galery[i]);
                }
            }
        } else if (product.anh_tu_khach_hang != '') {
            let subImages = product.anh_tu_khach_hang.split(',');
            images = subImages;
        }
        let config = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            customPaging: (i) => {
                if( window.innerWidth < 768 ) return  <div/>;
                return(
                    <div className="ft-slick__dots--custom">
                        <div className="i-image">
                            <img src={images[i]} />
                        </div>
                    </div>
                )
            }
        };
        
        return(
            <div className='popup popup-product-images'>
                <button onClick={()=> {
                    setShowPopupImages(false)
                }} className='btn-close'>X</button>
                <div className='header container'>
                    <div className='header-tab'>
                        <h3 onClick={()=> setIsProductTabImage(true)} className={`${ isProductTabImage ? 'active' : '' }`}>Ảnh sản phẩm</h3>
                        <h3 onClick={()=> setIsProductTabImage(false)} className={`${ !isProductTabImage ? 'active' : '' }`}>Ảnh từ khách hàng</h3>
                    </div>
                </div>
                <div className='tab tab-01'>
                    <div className='slider'>
                        <Slider {...config}>
                            {
                                images.map((_img) => <div key={uuidv4()} className='image'><img src={_img} alt={product.name}/></div>)
                            }
                        </Slider>
                    </div>
                </div>
                {/* <div className='tab tab-02'>
                    <div className='header'>
                        <h3>Ảnh từ khách hàng</h3>
                    </div>
                    <div className='slider'>
                        <Slider {...config}>
                            {
                                images.map((_img) => <div key={uuidv4()} className='image'><img src={_img} alt={product.name}/></div>)
                            }
                        </Slider>
                    </div>
                </div> */}
            </div>
        )
    }
    
    const _addToCart = async()=> {
        if( quantity > 0 ) {
            setLoading(true);
            try {
                var bodyFormData = new FormData();
                bodyFormData.append('action', 'insert_multiple_products_to_cart');
                bodyFormData.append('product_data_add_to_cart', `${product.id}_${quantity}`);
                let response = await axios.post(ADMIN_AJAX_URL, bodyFormData);
                if( response.data && response.data.success ) {
                    let sessionStorageCartItemKey = 'sessionStorageCartItemKey';
                
                    sessionStorage.setItem(sessionStorageCartItemKey, JSON.stringify(response.data.data));
                    setCartItemCount(response.data.data.total);
                    showMiniCart(true);
                    setTimeout(()=> showMiniCart(false), 2000)
                } else {
                    alert("Có lỗi xảy ra vui lòng thử lại!")
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
    }
    
    return(
        <React.Fragment>
            {
                loading && ShowLoading()
            }
            <div className='p-breadcrumb'>
                <div className='container breadcrumb'>
                    <Link to={"/"} onClick={()=> {
                        if( typeof config_header != 'undefined' ) {
                            window.payload = config_header.payload;
                            document.title = config_header.title_seo;
                        }
                    }}>Trang chủ</Link>
                    <span></span>
                    <p className='p-name'>{product.name}</p>
                </div>
            </div>
            <div className='product-content container'>
                <div className='product-header'>
                    <div className='images'>
                        <div className='main-image'>
                            <img src={product.image} alt={product.name} onClick={()=> {
                                setIsProductTabImage(true);
                                setShowPopupImages(true);
                            }}/>
                        </div>
                        {
                            product.galery && product.galery.length > 0 &&
                            <div className='galery'>
                                {
                                    product.galery.map((image) => <img onClick={()=> {
                                        setIsProductTabImage(true);
                                        setShowPopupImages(true);
                                    }} key={uuidv4()} src={image} alt={product.name} />)
                                }
                            </div>
                        }
                    </div>
                    <div className='product-short-info'>
                        <div className='p-name'>
                            <h3>{product.name}</h3>
                        </div>
                        <div className='p-price'>
                            {
                                product.sale_price != ''?
                                <React.Fragment>
                                    <del>{numberWithCommas(product.regular_price)}đ</del>
                                    <ins><span>Giá: </span>{numberWithCommas(product.sale_price)}đ</ins>
                                </React.Fragment>
                                :
                                <ins><span>Giá: </span>{numberWithCommas(product.regular_price)}đ</ins>
                            }
                        </div>
                        {
                            // đặt hàng
                            <React.Fragment>
                                <div className='input-quantity'>
                                    <label>Số lượng: 
                                    <input type="number" value={quantity} onChange={(e)=> {
                                        if(isNaN(e.target.value) || e.target.value < 1) {
                                            setQuantity(1);
                                        } else {
                                            setQuantity(e.target.value);
                                        }
                                    }} />
                                    </label>
                                </div>
                                <button onClick={_addToCart} className='btn-order'>Đặt hàng</button>
                            </React.Fragment>
                        }
                        {
                            product.order_note &&
                            <div className='p-order-note'>
                                <h3 style={{color: 'red'}}>Lưu ý đặt hàng:</h3>
                                <div dangerouslySetInnerHTML={{ __html: product.order_note }}></div>
                            </div>
                        }
                        {
                            product.short_description &&
                            <div className='p-short-desc'>
                                <div dangerouslySetInnerHTML={{ __html: product.short_description }}></div>
                            </div>
                        }
                    </div>
                </div>
                <div className='product-images-from-cus'>
                    
                </div>
                <div className={`product-description ${ showMore ? 'show-more' : '' }`}>
                    <div className='content' dangerouslySetInnerHTML={{__html: product.description}}></div>
                    {
                        
                        <div className={`btn-show-more ${ showMore ? '' : 'un-active' }`}>
                            <button onClick={()=> setShowMore(!showMore)} type='button'>
                                {
                                    !showMore ? 'Xem thêm' : 'Ẩn bớt'
                                }
                                <i className={`fas ${ showMore ? 'up' : 'down' }`}></i>
                            </button>
                        </div>
                    }
                </div>
            </div>
            
            {
                showPopupImages &&
                _showPopupImages()
            }
            
        </React.Fragment>
    )
}
// // create container
// const mapStateToProps = state => ({
// });
// const mapDispatchToProps = dispatch => ({
//     SetCartItemCount: (total) => dispatch(SetCartItemCount(total))
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ProductContentComponent);

export default ProductContentComponent