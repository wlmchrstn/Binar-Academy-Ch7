import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Navbar from '../modules/navbar/navbar';
import Footer from '../modules/footer/footer';
import Custom404 from '../pages/custom404/custom404';
import Custom401 from '../pages/custom401/custom401';
import HomePage from '../pages/home/home';
import LoginPage from '../pages/login/login';
import LoginAdminPage from '../pages/login-admin/login-admin';
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
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/customer'} element={<CustomerPage />} />
            </Route>
            <Route path={'*'} element={<Custom404 />} />
            <Route path={'/401'} element={<Custom401 />} />
            <Route path={'/register'} element={<LoginPage path={'register'} />} />
            <Route path={'/login'} element={<LoginPage path={'login'} />} />
            <Route path={'/login-admin'} element={<LoginAdminPage />} />
            <Route path={'/admin'} element={<AdminPage />} />
        </Routes>
    );
};

export default Router;
