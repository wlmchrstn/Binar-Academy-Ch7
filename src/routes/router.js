import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Navbar from '../modules/navbar/navbar';
import Footer from '../modules/footer/footer';
import Custom404 from '../pages/custom404/custom404';
import Custom401 from '../pages/custom401/custom401';
import HomePage from '../pages/home/home';
import AdminPage from '../pages/admin/admin';
import CustomerPage from '../pages/customer/customer';

const WithNavFoot = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

const Router = () => {
    return (
        <Routes>
            <Route element={<WithNavFoot />}>
                <Route path={'/customer'} element={<CustomerPage />} />
            </Route>
            <Route path={'*'} element={<Custom404 />} />
            <Route path={'/401'} element={<Custom401 />} />
            <Route path={'/'} element={<HomePage path={'register'} />} />
            <Route path={'/login'} element={<HomePage path={'login'} />} />
            <Route path={'/admin'} element={<AdminPage />} />
        </Routes>
    );
};

export default Router;
