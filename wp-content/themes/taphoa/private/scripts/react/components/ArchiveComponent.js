import React, { lazy, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FooterComponent from './footer/FooterComponent';
import MainHeaderComponent from './header/MainHeaderComponent';
import { TriggerLoading } from '../redux/functions/global_functions';
import ProductItemComponent from './share/ProductItemComponent';
import { AJAX_URL } from '../variables/constants';
import { ShowLoading } from '../helpers/loading';



const NoMatchComponent = lazy(()=> import('./NoMatchComponent'));


const ArchiveComponent = ({_TriggerLoading})=> {
    const [page, setPage] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [products, setProducts] = useState([]);
    const [cat_id, setCatId] = useState(-1);
    const [loading, setLoading] = useState(false);
    
    
    useEffect(()=> {
        return () => {
            // Anything in here is fired on component unmount.
            setPage(1);
            setCatId(-1);
        }
    },[]);
    
    const _loadProductArchive = async()=> {
        let url = AJAX_URL;
        if( window.payload.page == 'product-archive' ) {
            url += 'archive';
        } else {
            url += 'shop-archive';
        }
        try {
            setLoading(true);
            let response = await axios.get( url, {
                params: {
                    paged: page,
                    cat_id: window.payload.category_id
                }
            } );
            if( response.data && response.data.success ) {
                setProducts(response.data.data.products);
                if( response.data.data.products.length == 0 ) {
                    setErrorMsg('Chúng tôi đang chuẩn bị sản phẩm cho danh mục này, Quý Khách vui lòng ghé lại vào lần tới nhé!!!');
                }
            } else {
                setProducts([]);
                setErrorMsg('Chúng tôi đang chuẩn bị sản phẩm cho danh mục này, Quý Khách vui lòng ghé lại vào lần tới nhé!!!');
            }
        } catch (err) {
            console.log(err);
            setProducts([]);
            setErrorMsg('');
        } finally {
            setLoading(false);
        }
    }
    
    if( cat_id != window.payload.category_id ) {
        setCatId(window.payload.category_id);
        setProducts([]);
        setPage(1);
        setErrorMsg('');
        _loadProductArchive();
    }
    
    
    if(payload && payload.page == '404') {
        return <NoMatchComponent />
    }

    let matchParams = useParams();

    return(
        <React.Fragment>
            {
                loading && ShowLoading()
            }
            <MainHeaderComponent/>
            <div className='p-breadcrumb'>
                <div className='container breadcrumb'>
                    <Link to={"/"} onClick={()=> {
                        if( typeof config_header != 'undefined' ) {
                            window.payload = config_header.payload;
                            document.title = config_header.title_seo;
                        } else {
                            let home_title = payload.title.split('-')[payload.title.split('-').length -1];
                            window.payload = {
                                page: "home",
                                title: home_title
                            }
                            document.title = home_title;
                        }
                    }}>Trang chủ</Link>
                    <span></span>
                    <p>{payload.title.split('-')[0]}</p>
                </div>
            </div>
            <div className='container page-archive'>
                {
                    errorMsg == '' ?
                    <div className='lst-products'>
                        <div className='lst-items'>
                            {
                                products && products.map((product) => {
                                    return <ProductItemComponent product={product} key={uuidv4()} />
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className='error-msg'>
                        <p className='error'>{errorMsg}</p>
                    </div>
                }
            </div>
            
            <FooterComponent/>
        </React.Fragment>
    )
}

// create container
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArchiveComponent);