import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Custom404 from '../pages/custom404/custom404';
import HomePage from '../pages/home/home';
import AdminPage from '../pages/admin/admin';
import CustomerPage from '../pages/customer/customer';

const Router = () => {
    return (
        <Routes>
            <Route path={'*'} element={<Custom404 />} />
            <Route path={'/'} element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/customer" element={<CustomerPage />} />
        </Routes>
    );
};

export default Router;
