import React from 'react';
import { Link } from 'react-router-dom';

import { numberWithCommas } from '../../helpers/format';

const ProductItemComponent = ({ product }) => {
    return(
        <div className='product-item'>
            <div className='p-image'>
                <Link to={product.url}>
                    <img src={product.image_url} alt={product.title}/>
                </Link>
            </div>
            <div className='p-content'>
                <Link to={product.url}>
                    <h4>{product.title}</h4>
                    <div className='p-price'>
                        {
                            product.sale_price != ''?
                            <React.Fragment>
                                <del>{numberWithCommas(product.regular_price)}đ</del>
                                <ins>{numberWithCommas(product.sale_price)}đ</ins>
                            </React.Fragment>
                            :
                            <ins>{numberWithCommas(product.regular_price)}đ</ins>
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductItemComponent;