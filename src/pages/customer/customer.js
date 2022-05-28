import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './customer.module.scss';

// Modules
import CustomerHero from '../../modules/customer-hero/customer-hero';
import Search from '../../modules/search/search';

const CustomerPage = () => {
    const [hero,setHero] = useState('pembayaran');
    const navigate = useNavigate();
    // useEffect(() => {
    //     const token = sessionStorage.getItem('bcrToken');
    //     const role = sessionStorage.getItem('bcrRole');
    //     if (!token) return navigate('/401');
    //     if (role !== 'customer') return navigate('/401');
    // });

    return (
        <div className={styles.root}>
            {hero === 'home' ? (
                <CustomerHero />
            ) : (
                <div className={styles.hero} />
            )}
            <Search setHero={setHero} />
        </div>
    );
};

export default CustomerPage;
