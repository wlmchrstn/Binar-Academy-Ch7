import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.scss';

// Modules
import SideBar from '../../modules/sidebar/sidebar';
import AdminNavbar from '../../modules/admin-navbar/admin-navbar';
import Dashboard from '../../modules/dashboard/dashboard';
import Cars from '../../modules/cars/cars';

// Assets
import Spinner from '../../components/spinner/spinner';
import axios from 'axios';

// Dummy data
const order = {
    col1: 'User Email',
    col2: 'Car',
    col3: 'Start Rent',
    col4: 'Finish Rent',
    col5: 'Price',
    col6: 'Status',
};

const orderList = [
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
    order,order,order,order,order,
];

const car = {
    col1: 'Name',
    col2: 'Category',
    col3: 'Price',
    col4: 'Start Rent',
    col5: 'Finish Rent',
    col6: 'Created at',
    col7: 'Updated at',
};

const carList = [
    car,car,car,car,car,
    car,car,car,car,car,
    car,car,car,car,car,
    car,car,car,car,car,
    car,car,car,car,car,
];

const AdminPage = () => {
    const [sideBar,setSideBar] = useState('Dashboard');
    const [dashboard,setDashboard] = useState('Order');
    const [car,setCar] = useState(null);
    const [loading,setLoading] = useState(true);
    const [refresh,setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('bcrToken');
        const role = sessionStorage.getItem('bcrRole');
        if (!token) return navigate('/401');
        if (role !== 'admin') return navigate('/401');
    });

    const getData = async () => {
        const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/car`, {
            headers: { "Access-Control-Allow-Origin": "*" }
        });
        setCar(response);
    };

    useEffect(() => {
        if (car) setLoading(false);
    }, [car]);

    useLayoutEffect(() => {
        getData();
    }, [refresh]);

    return (
        <section className={styles.root}>
            {loading ? <Spinner /> : (
                <>
                    <AdminNavbar />
                    <div className={styles.wrapper}>
                        {sideBar === 'Dashboard' && (<Dashboard sideBarState={sideBar} state={dashboard} data={(dashboard === 'Order') ? orderList : carList } />)}
                        {sideBar === 'Cars' && (<Cars sideBarState={sideBar} data={car} handleRefresh={setRefresh} refresh={refresh} />)}
                    </div>
                    <SideBar handleSideBar={setSideBar} handleContent={setDashboard} sideBarState={sideBar} contentState={dashboard} />
                </>
            )}
        </section>
    );
};

export default AdminPage;
