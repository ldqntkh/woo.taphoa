import React, {useState, useEffect, lazy} from 'react';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ShowLoading } from '../../helpers/loading';
import { numberWithCommas } from '../../helpers/format';
import { ADMIN_AJAX_URL, SessionStorageCartItemKey } from '../../variables/constants';

import { SetCartItemCount } from '../../redux/functions/header_functions';

const NoMatchComponent = lazy(()=> import('../NoMatchComponent'));

import FooterComponent from '../footer/FooterComponent';
import MainHeaderComponent from '../header/MainHeaderComponent';



const CartComponent = ({_SetCartItemCount})=> {
    if(payload && payload.page == '404') {
        return <NoMatchComponent />
    }
    
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [delProduct, setDelProduct] = useState(null)
    
    useEffect(()=> {
        _loadCartData()
        return () => {
        }
    },[]);
    
    const _loadCartData = async()=> {
        // let url = AJAX_URL + 'product';
        try {
            setLoading(true);
            
            var bodyFormData = new FormData();
            bodyFormData.append('action', 'get_cart_content');
            let response = await axios.post(ADMIN_AJAX_URL, bodyFormData);
            if( response.data && response.data.success ) {
                setCart(response.data.data.cart)
                sessionStorage.setItem(SessionStorageCartItemKey, JSON.stringify(response.data.data.fragment));
                _SetCartItemCount(response.data.data.fragment.total);
            } else {
                alert("Có lỗi xảy ra vui lòng thử lại!")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    
    const _delProductInCart = async()=> {
        setLoading(true);
        let bkDelProduct = delProduct;
        setDelProduct(null)
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('action', 'delete_cart_item');
            bodyFormData.append('p-id', delProduct.id);
            let response = await axios.post(ADMIN_AJAX_URL, bodyFormData);
            if( response.data && response.data.success ) {
                setCart(response.data.data.cart)
                sessionStorage.setItem(SessionStorageCartItemKey, JSON.stringify(response.data.data.fragment));
                _SetCartItemCount(response.data.data.fragment.total);
            } else {
                alert("Có lỗi xảy ra vui lòng thử lại!");
                setDelProduct(bkDelProduct);
            }
        } catch (err) {
            console.log(err);
            setDelProduct(bkDelProduct);
        } finally {
            setLoading(false);
        }
    }
    
    const _renderPopupDelProduct = ()=> {
        return(
            <div className='loading'>
                <div className='form-del'>
                    <div className='header'>
                        <h3>Xóa sản phẩm?</h3>
                    </div>
                    <div className='content'>
                        <h3>Bạn chắc chắn muốn xóa sản phẩm: <strong>{delProduct.name}</strong></h3>
                    </div>
                    <div className='footer'>
                        <button onClick={_delProductInCart} className='ok'>Xác nhận <i className="fa-solid fa-face-sad-cry"></i></button>
                        <button onClick={()=>setDelProduct(null)} className='cancel'>Hủy <i className="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
        )
    }
    
    const _renderCart = ()=> {
        if( !cart || cart.length == 0 ) return null;
        let subTotal = 0;
        let total = 0;
        let discount = 0;
        for( let i = 0; i < cart.length; i++ ) {
            let p = cart[i];
            subTotal += (p.sale_price ? parseInt(p.sale_price) * p.quantity : parseInt(p.regular_price) * p.quantity);
            discount += (p.discount ? parseInt(p.discount) : 0)
        }
        total = subTotal - discount;
        return(
            <div className='cart-component container'>
                <div className='cart-items'>
                    {
                        cart && cart.map((cart_item, index) => {
                            return(
                                <div className='cart-item' key={uuidv4()}>
                                    <div className='p-image' dangerouslySetInnerHTML={{__html: cart_item.thumbnail}}></div>
                                    <div className='p-content'>
                                        <div className='p-name'>
                                            <Link to={`/san-pham/${cart_item.product_permalink.split('san-pham/')[1]}`} onClick={()=> {
                                                window.payload = {
                                                    page: "single-product",
                                                    product_id: cart_item.id,
                                                    title: cart_item.name
                                                }
                                                document.title = cart_item.name
                                            }}>
                                            <h4>{cart_item.name}</h4>
                                            </Link>
                                           
                                            <div className='input-quantity'>
                                                <label>Số lượng: 
                                                    <input type="number" value={cart_item.quantity} onChange={(e)=> {
                                                        if(isNaN(e.target.value) || e.target.value < 1) {
                                                            cart[index].quantity = 1;
                                                        } else {
                                                            cart[index].quantity = e.target.value;
                                                        }
                                                        setCart(cart)
                                                    }} />
                                                </label>
                                            </div>
                                            <div className='p-price'>
                                                {
                                                    cart_item.sale_price != ''?
                                                    <React.Fragment>
                                                        <del>{numberWithCommas(cart_item.regular_price)}đ</del>
                                                        <ins><span>Giá: </span>{numberWithCommas(cart_item.sale_price)}đ</ins>
                                                    </React.Fragment>
                                                    :
                                                    <ins><span>Giá: </span>{numberWithCommas(cart_item.regular_price)}đ</ins>
                                                }
                                            </div>
                                            
                                        </div>
                                        <button className='p-del' onClick={()=>setDelProduct(cart_item)}>Xóa</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    delProduct && _renderPopupDelProduct()
                }
                <div className='cart-total'>
                    <div className='cart-total-content'>
                        <table>
                            <tr>
                                <td className='title'>Tạm tính:</td>
                                <td className='value'>{numberWithCommas(subTotal)}đ</td>
                            </tr>
                            <tr>
                                <td className='title'>Khuyến mãi:</td>
                                <td className='value'>{numberWithCommas(discount)}đ</td>
                            </tr>
                            <tr className='total'>
                                <td className='title'>Tổng:</td>
                                <td className='value'>{numberWithCommas(total)}đ</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='process-payment'>
                    <Link to={'/thanh-toan'}>Thanh toán</Link>
                </div>
            </div>
        )
    }
    
    if( cart && cart.length == 0 ) {
        location.href = '/';
        return false;
    }
    
    return(
        <React.Fragment>
            {
                loading && ShowLoading()
            }
            <MainHeaderComponent />
            {
                errorMsg != '' &&
                <div className='container'>
                    <div className='error-msg'>
                        <p className='error'>{errorMsg}</p>
                    </div>
                </div>
            }
            {
                cart && _renderCart()
            }
            <FooterComponent/>
        </React.Fragment>
    )
}

// create container
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => ({
    _SetCartItemCount: (total) => dispatch(SetCartItemCount(total)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartComponent);
