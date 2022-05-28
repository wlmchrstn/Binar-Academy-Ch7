import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './hero.module.scss';

import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.root}>
            <div className={styles.banner}>
                <Title tagElement={'h1'} variant={'banner'} color={'black'}>
                    {'Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)'}
                </Title>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.'}
                </Paragraph>
                <div className={styles.button}>
                    <Button type={'button'} variant={'secondary'} onClick={() => navigate('/customer')}>
                        {'Mulai Sewa Mobil'}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
