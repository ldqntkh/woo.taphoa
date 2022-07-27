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
            menus: []
        }
    }

    async componentDidMount() {
        await this._loadHeader()
    }

    _loadHeader = async()=> {
        let sessionStorageKey = 'header_data';
        let header_data = sessionStorage.getItem( sessionStorageKey );
        try {
            let flag = false;
            // get data từ sessionStorage
            if( header_data ) {
                header_data = JSON.parse(header_data);
                this.setState(header_data);
                flag = true;
            }

            if( !flag ) {
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
        } catch (err) {

        }
    }

    _setPageTitle = (title)=> {
        document.title = title;
    }

    render() {
        let {
            logoUrl,
            title_seo,
            payload,
            menus
        } = this.state;

        let open_class = "";
        if( this.props.headerData.isShowMenu ) {
            open_class = 'open';
            document.body.classList.add('disable');
        } else {
            document.body.classList.remove('disable')
        }
        return(
            <React.Fragment>
                <header>
                    <div className={`main-header container ${open_class}`}>
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
                                                    this.props.TriggerMenuMobile();
                                                }}>{item.label}</Link>
                                                { item.subs && item.subs.length > 0 &&
                                                    <ul className='sub-items'>
                                                        {
                                                            item.subs.map((subItem, subIndex) => 
                                                                <li key={uuidv4()}>
                                                                    <Link onClick={()=> {
                                                                        this._setPageTitle(subItem.title_seo);
                                                                        window.payload = subItem.payload;
                                                                        this.props.TriggerMenuMobile();
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
                                                            this.props.TriggerMenuMobile();
                                                        }}
                                                        to={ item.subs && item.subs.length > 0 ?  "#" : item.url }
                                                    >{item.label}</Link>
                                                    { item.subs && item.subs.length > 0 &&
                                                        <ul className='sub-items'>
                                                            { item.subs && item.subs.length > 0 && 
                                                                <li key={uuidv4()}>
                                                                    <Link onClick={()=> {
                                                                        this._setPageTitle(item.title_seo);
                                                                        window.payload = item.payload;
                                                                        this.props.TriggerMenuMobile();
                                                                    }} to={item.url}>{item.label}</Link>
                                                                </li> }
                                                            {
                                                                item.subs.map((subItem, subIndex) => 
                                                                    <li key={uuidv4()}>
                                                                        <Link onClick={()=> {
                                                                            this._setPageTitle(subItem.title_seo);
                                                                            window.payload = subItem.payload;
                                                                            this.props.TriggerMenuMobile();
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
                    </div>
                    <div className={`hamburger-menu ${open_class}`} onClick={()=> {
                        // this.setState({ open_class: open_class == '' ? 'open' : '' });
                        this.props.TriggerMenuMobile();
                    }}><div className='line'></div></div>
                </header>
                {
                    this.props.headerData.isShowMenu &&
                    <div className='rectang-menu' onClick={this.props.TriggerMenuMobile}></div>
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