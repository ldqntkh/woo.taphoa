import React, {useState, useEffect, lazy} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AJAX_URL } from '../../variables/constants';
import { ShowLoading } from '../../helpers/loading';

import { connect } from 'react-redux';
import { SetCartItemCount, TriggerShowMiniCart } from '../../redux/functions/header_functions';

import FooterComponent from '../footer/FooterComponent';
import MainHeaderComponent from '../header/MainHeaderComponent';
import ProductContentComponent from './ProductContentComponent';

const NoMatchComponent = lazy(()=> import('../NoMatchComponent'));

const ProductComponent = ({ _SetCartItemCount, _TriggerShowMiniCart })=> {
    if(payload && payload.page == '404') {
        return <NoMatchComponent />
    }
    
    const [product, setProduct] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(()=> {
        _loadProductData()
        return () => {
        }
    },[]);
    
    const _loadProductData = async()=> {
        let url = AJAX_URL + 'product';
        try {
            setLoading(true);
            let response = await axios.get( url, {
                params: {
                    "p-id": window.payload.product_id
                }
            } );
            if( response.data && response.data.success ) {
                setProduct(response.data.data);
            } else {
                setProduct(false);
                setErrorMsg(`Sản phẩm ${window.payload.title}, Quý Khách vui lòng ghé lại vào lần tới nhé!!!`);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    // let matchParams = useParams();

        
    const _renderProduct = ()=> {
        
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
                product && <ProductContentComponent setCartItemCount={_SetCartItemCount} showMiniCart={_TriggerShowMiniCart} product={product} />
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
    _TriggerShowMiniCart: (flag) => dispatch(TriggerShowMiniCart(flag))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductComponent);
