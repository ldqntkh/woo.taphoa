import React, { lazy, Suspense } from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, 
    Routes, 
    Route } from 'react-router-dom';
    
const MainHomeComponent = lazy(()=> import('./components/HomePageComponent'));
const NoMatchComponent = lazy(()=> import('./components/NoMatchComponent'));
const ProductComponent = lazy(()=> import('./components/product/ProductComponent'))

// var MainComponent = null;
// switch( window.payload.page ) {
//     case 'home':
//         MainComponent = MainHomeComponent;
//         break;
// }

const container = document.getElementById('main-app-container');
const root = createRoot(container);


root.render(
    <Suspense fallback={
        <div className="loading">
            <div className="outerCircle"></div>
            <div className="innerCircle"></div>
        </div>
    }>
        <Router>
            {/* <MainComponent /> */}
            <Routes>
                <Route exact path="/" element={<MainHomeComponent />} />
                {/* Category */}
                <Route exact path="/danh-muc/:slug" element={<MainHomeComponent />} />
                {/* Product */}
                <Route exact path="/san-pham/:slug" element={<ProductComponent />} />
                {/* 404 */}
                <Route path="*" element={<NoMatchComponent />} />
            </Routes>
        </Router>
    </Suspense>);