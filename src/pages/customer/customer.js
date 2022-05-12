import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './customer.module.scss';

import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';

const CustomerPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('bcrToken');
        const role = sessionStorage.getItem('bcrRole');
        if (!token) return navigate('/401');
        if (role !== 'customer') return navigate('/401');
    });

    return (
        <section className={styles.root}>
            <div className={styles.banner}>
                <Title tagElement={'h1'} variant={'banner'} color={'black'}>
                    {'Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)'}
                </Title>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.'}
                </Paragraph>
            </div>
        </section>
    );
};

export default CustomerPage;
