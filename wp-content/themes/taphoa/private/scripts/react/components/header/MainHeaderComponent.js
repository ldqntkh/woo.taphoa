import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import { AJAX_URL } from '../../variables/constants';

// redux
import { TriggerMenuMobile } from '../../redux/functions/header_functions';

class MainHeaderComponent extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            logoUrl: '',
            menus: [],
            searchValue: '',
            open_class: '',
            showMobileSearch: false,
            showPcSearch: false
        }
    }

    async componentDidMount() {
        window.addEventListener('resize', this._onWindowResize);
        await this._loadHeader()
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize);
    }
    
    _onWindowResize = () => {
        if( this.state.showPcSearch && window.innerWidth < 820 ) {
            this.setState({ showPcSearch: false });
        }
    }

    _loadHeader = async()=> {
        try {
            let flag = false;
            if( typeof config_header != 'undefined' ) {
                this.setState(config_header);
                flag = true;
            }
            
            if( !flag ) {
                let sessionStorageKey = 'header_data';
                let header_data = sessionStorage.getItem( sessionStorageKey );
                // get data từ sessionStorage
                if( header_data ) {
                    header_data = JSON.parse(header_data);
                    this.setState(header_data);
                } else {
                    // fetch from server to check version
                    let response = await axios.get( AJAX_URL, {
                        params: {
                            'header-ajax': true
                        }
                    } );
                    if( response.data.success ) {
                        let responseData = response.data.data;
                        if( responseData.version != this.state.version ) {
                            this.setState(responseData);

                            // ghi vào sessionStorage
                            sessionStorage.setItem( sessionStorageKey, JSON.stringify(responseData) )
                        }
                        
                    }
                }
            }
        } catch (err) {

        }
    }

    _setPageTitle = (title)=> {
        document.title = title;
    }

    _isOpenMenu = (open_class)=> {
        this.setState({ open_class: open_class == '' ? 'open' : '' })
    }
    
    _onSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    render() {
        let {
            logoUrl,
            title_seo,
            payload,
            menus,
            open_class,
            searchValue,
            showMobileSearch,
            showPcSearch
        } = this.state;

        if( open_class != '' || showMobileSearch || showPcSearch ) {
            document.body.classList.add('disable');
        } else {
            document.body.classList.remove('disable')
        }
        
        return(
            <React.Fragment>
                <header>
                    <div className={`main-header container ${open_class} ${showMobileSearch ? 'open-search' : ''}`}>
                        <div id='logo'>
                            <Link to="/" onClick={()=> {
                                this._setPageTitle(title_seo);
                                window.payload = payload;
                                this.props.TriggerMenuMobile(false);
                            }}>
                                <img src={logoUrl ? logoUrl : 'wp-content/themes/taphoa/build/images/logo.png'} alt="Trang chủ" />
                            </Link>
                        </div>
                        <nav className='hide-desktop'>
                            <ul className='nav-menus'>
                                {
                                    menus && menus.map((item, index) => {
                                        return(
                                            <li key={uuidv4()}>
                                                <Link to={item.url} onClick={()=> {
                                                    this._setPageTitle(item.title_seo);
                                                    window.payload = item.payload;
                                                    this._isOpenMenu(open_class)
                                                    // this.props.TriggerMenuMobile();
                                                }}>{item.label}</Link>
                                                { item.subs && item.subs.length > 0 &&
                                                    <ul className='sub-items'>
                                                        {
                                                            item.subs.map((subItem, subIndex) => 
                                                                <li key={uuidv4()}>
                                                                    <Link onClick={()=> {
                                                                        this._setPageTitle(subItem.title_seo);
                                                                        window.payload = subItem.payload;
                                                                        this._isOpenMenu(open_class)
                                                                        // this.props.TriggerMenuMobile();
                                                                    }} to={subItem.url}>{subItem.label}</Link>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                        <nav className='hide-mobile'>
                            <ul className='nav-menus'>
                                {
                                    menus && menus.map((item, index) => {
                                        return(
                                            <li key={uuidv4()} className={ item.subs && item.subs.length > 0 ? 'items have-sub' : 'items' }>
                                                <Link 
                                                    onClick={()=> {
                                                        this._setPageTitle(item.title_seo);
                                                        window.payload = item.payload;
                                                        // this.props.TriggerMenuMobile();
                                                    }}
                                                    to={ item.url }
                                                >{item.label}</Link>
                                                { item.subs && item.subs.length > 0 &&
                                                    <ul className='sub-items'>
                                                        {
                                                            item.subs.map((subItem, subIndex) => 
                                                                <li key={uuidv4()}>
                                                                    <Link onClick={()=> {
                                                                        this._setPageTitle(subItem.title_seo);
                                                                        window.payload = subItem.payload;
                                                                        // this.props.TriggerMenuMobile();
                                                                    }} to={subItem.url}>{subItem.label}</Link>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                        <div className='hide-mobile search-box'>
                            <input onChange={this._onSearchChange} type="text" 
                                onClick={()=> this.setState({showPcSearch: true})}
                                placeholder="Bạn tìm gì..." value={searchValue}/>
                            <Link to="/gio-hang">
                                <span id='cart-total'>0</span>
                                <i className="i-cart"></i>
                            </Link>
                            
                            {/* test */}
                            {
                                showPcSearch &&
                                <div className='pc-search-result'>
                                    <ul className='lst-search-results'>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                        
                        {/* mobile search box */}
                        {
                            showMobileSearch &&
                            <div className='mb-search'>
                                <input onChange={this._onSearchChange} type="text" placeholder="Bạn tìm gì..." value={searchValue}/>
                                <div className='mb-search-results'>
                                    <ul className='lst-search-results'>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='result-item'>
                                            <Link to="#">
                                                <img src="wp-content/themes/taphoa/build/images/logo.png" />
                                                <div className='item-info'>
                                                    <p><strong>Chè dưỡng nhan</strong></p>
                                                    <p className='price'><strong>35.000đ</strong></p>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                    
                    {/* menu button */}
                    <div className={`hamburger-menu ${open_class}`} onClick={()=> {
                        this._isOpenMenu(open_class)
                        this.setState({ showMobileSearch: false })
                        // this.props.TriggerMenuMobile();
                    }}><div className='line'></div></div>
                    
                    {/* search - cart button */}
                    <div className='search-cart'>
                        <button type='button' className='search'
                            onClick={()=> {
                                this.setState({ showMobileSearch: !showMobileSearch });
                                this._isOpenMenu('open');
                            }}></button>
                        <Link to="/gio-hang">
                            <span id='cart-total'>0</span>
                            <i className="i-cart"></i>
                        </Link>
                    </div>
                </header>
                {
                    (open_class != '' || showMobileSearch || showPcSearch ) &&
                    <div className={`rectang-menu ${showPcSearch ? 'pc-search' : ''}`} onClick={()=> {
                        this._isOpenMenu()
                        this.setState({ showMobileSearch: false, showPcSearch: false })
                        // this.props.TriggerMenuMobile();
                    }}></div>
                }
            </React.Fragment>
        )
    }
}

// create container
const mapStateToProps = state => ({
    headerData : state.HeaderReducer,
});
const mapDispatchToProps = dispatch => ({
    TriggerMenuMobile: (flag)=> dispatch(TriggerMenuMobile(flag))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHeaderComponent);