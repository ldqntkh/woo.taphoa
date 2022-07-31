import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ProductItemComponent from '../share/ProductItemComponent';

const SlickProductsComponent = lazy(()=> import('../share/SlickProductsComponent'));

const HomeListProductComponent = ({ dataProducts })=> {
    return (
        <div className={`container home-${dataProducts.display_type}-products`}>
            <div className='header'>
                <h3>{dataProducts.title}</h3>
                <Link onClick={()=> {
                                window.payload = dataProducts.payload;
                                document.title = dataProducts.payload.title
                            }} 
                    to={dataProducts.url} className="show-768">
                    Xem thêm
                </Link>
            </div>
            <div className='contents'>
                {
                    dataProducts.display_type == 'normal' ?
                    // normal product
                    <div className='lst-products'>
                        <div className='lst-items'>
                            {
                                dataProducts.products.map((product) => {
                                    return <ProductItemComponent product={product} key={uuidv4()} />
                                })
                            }
                        </div>
                    </div>
                    :
                    // slider product
                    <div className='lst-products'>
                        <SlickProductsComponent lstProduct={dataProducts.products} />
                    </div>
                }
            </div>
            <div className='footer hide-768'>
                <Link onClick={()=> {
                                window.payload = dataProducts.payload;
                                document.title = dataProducts.payload.title
                            }} 
                    to={dataProducts.url}>
                    Xem thêm
                </Link>
            </div>
        </div>
    )
}

export default HomeListProductComponent;