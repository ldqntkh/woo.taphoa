import React, { lazy, Suspense } from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, 
    Routes, 
    Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {AppStore} from './redux/store/IndexStore';
    
const MainHomeComponent = lazy(()=> import('./components/HomePageComponent'));
const NoMatchComponent = lazy(()=> import('./components/NoMatchComponent'));
const ProductComponent = lazy(()=> import('./components/product/ProductComponent'));
const ArchiveComponent = lazy(()=> import('./components/ArchiveComponent'));

const MainApp = ({globalData})=> {
    return(
        <React.Fragment>
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainHomeComponent />} />
                    {/* Category */}
                    <Route path="/danh-muc">
                        <Route path=":slug" element={<ArchiveComponent />}></Route>
                        <Route path=":slug/:sub_slug" element={<ArchiveComponent />}></Route>
                    </Route>
                    {/* Product */}
                    <Route exact path="/san-pham/:slug" element={<ProductComponent />} />
                    {/* 404 */}
                    <Route path="/404" element={<NoMatchComponent />} />
                    <Route path="*" element={<NoMatchComponent />} />
                </Routes>
            </Router>
        </React.Fragment>
    )
}

// create container
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => ({
    
});

const MainAppConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainApp);

const App = ()=> {
    return (
        <Suspense fallback={
            <div className="loading">
                <div className="outerCircle"></div>
                <div className="innerCircle"></div>
            </div>
        }>
            <Provider store={AppStore}>
                <MainAppConnect />
            </Provider>
        </Suspense>
    )
}

const container = document.getElementById('main-app-container');
const root = createRoot(container);


root.render(<App />);