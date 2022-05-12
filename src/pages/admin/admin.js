import React, { useState } from 'react';
import styles from './admin.module.scss';

// Modules
import SideBar from '../../modules/sidebar/sidebar';
import AdminNavbar from '../../modules/admin-navbar/admin-navbar';
import Dashboard from '../../modules/dashboard/dashboard';
import Cars from '../../modules/cars/cars';

// Assets
import smallCar from '../../assets/images/small.png';
import mediumCar from '../../assets/images/medium.png';
import largeCar from '../../assets/images/large.png';

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

const small = {
    src: smallCar,
    label: 'Nama',
    type: 'Tipe Mobil',
    price: '430.000',
    startRent: 'Start rent',
    finishRent: 'Finish rent',
    update: '4 Apr 2020, 09:00',
    filter: 'Small',
};

const medium = {
    src: mediumCar,
    label: 'Nama',
    type: 'Tipe Mobil',
    price: '430.000',
    startRent: 'Start rent',
    finishRent: 'Finish rent',
    update: '4 Apr 2020, 09:00',
    filter: 'Medium',
};

const large = {
    src: largeCar,
    label: 'Nama',
    type: 'Tipe Mobil',
    price: '430.000',
    startRent: 'Start rent',
    finishRent: 'Finish rent',
    update: '4 Apr 2020, 09:00',
    filter: 'Large',
};

const cardList = [
    small, large, medium,
    large, medium, small,
    medium, small, large,
    large, medium, small,
    medium, small, large,
    small, large, medium,
    large, medium, small,
];

const AdminPage = () => {
    const [sideBar,setSideBar] = useState('Dashboard');
    const [dashboard,setDashboard] = useState('Order');

    return (
        <section className={styles.root}>
            <AdminNavbar />
            <div className={styles.wrapper}>
                {sideBar === 'Dashboard' && (<Dashboard sideBarState={sideBar} state={dashboard} data={(dashboard === 'Order') ? orderList : carList } />)}
                {sideBar === 'Cars' && (<Cars sideBarState={sideBar} data={cardList} />)}
            </div>
            <SideBar handleSideBar={setSideBar} handleContent={setDashboard} sideBarState={sideBar} contentState={dashboard} />
        </section>
    );
};

export default AdminPage;
