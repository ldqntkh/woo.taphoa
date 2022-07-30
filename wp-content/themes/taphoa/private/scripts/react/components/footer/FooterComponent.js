import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AJAX_URL } from '../../variables/constants'

class FooterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        await this._loadFooter();
    }

    _loadFooter = async()=> {
        
        try {
            let flag = false;
            // get data từ sessionStorage
            if( typeof config_footer != undefined ) {
                this.setState(config_footer);
                flag = true;
            }

            if( !flag ) {
                let sessionStorageKey = 'footer_data';
                let footer_data = sessionStorage.getItem( sessionStorageKey );
                if( footer_data ) {
                    footer_data = JSON.parse(footer_data);
                    this.setState(footer_data);
                } else {
                    // fetch from server to check version
                    let response = await axios.get( AJAX_URL, {
                        params: {
                            'footer-ajax': true
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

    render() {
        let {
            col1, col2, col3, logoUrl, slogan
        } = this.state;

        if( !logoUrl ) return null;

        return(
            <footer id="colophon" className="site-footer">
                <div className='footer-info container'>
                    {/* có 4 cột */}
                    <div className='col col1'>
                        <h3>Về chúng tôi</h3>
                        <img src={logoUrl} alt=""/>
                        <p>{slogan}</p>
                    </div>
                    <div className='col col2'>
                        <h3 dangerouslySetInnerHTML={{__html: col1.title ? col1.title : "&nbsp;"}}></h3>
                        <ul>
                            { col1.items.map((item) => {
                                return(
                                    item.url ?
                                    <li key={uuidv4()}> <a href={item.url} dangerouslySetInnerHTML={{__html: item.title}}></a> </li>
                                    :
                                    <li key={uuidv4()} dangerouslySetInnerHTML={{__html: item.title}}></li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className='col col3'>
                        <h3 dangerouslySetInnerHTML={{__html: col2.title ? col2.title : "&nbsp;"}}></h3>
                        <ul>
                            { col2.items.map((item) => {
                                return(
                                    item.url ?
                                    <li key={uuidv4()}> <a href={item.url} dangerouslySetInnerHTML={{__html: item.title}}></a> </li>
                                    :
                                    <li key={uuidv4()} dangerouslySetInnerHTML={{__html: item.title}}></li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className='col col4'>
                        <h3 dangerouslySetInnerHTML={{__html: col3.title ? col3.title : "&nbsp;"}}></h3>
                        <ul>
                            { col3.items.map((item) => {
                                return(
                                    item.url ?
                                    <li key={uuidv4()}> <a href={item.url} dangerouslySetInnerHTML={{__html: item.title}}></a> </li>
                                    :
                                    <li key={uuidv4()} dangerouslySetInnerHTML={{__html: item.title}}></li>
                                )
                            }) }
                        </ul>
                        <h3>Theo dõi chúng tôi</h3>
                        {
                            col3.follows.map((item) => {
                                return(
                                    <li key={uuidv4()}> <a target="_blank" href={item.url}><img src={item.title} alt=""/></a> </li>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='footer-c'>

                </div>
            </footer>
        )
    }
}

export default FooterComponent;