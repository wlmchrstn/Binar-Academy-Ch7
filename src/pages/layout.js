import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Router from '../routes/router';
// import Footer from '../modules/footer/footer';
// import Navbar from '../modules/navbar/navbar';

const Layout = () => {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Router />
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default Layout;
