import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './banner.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.root}>
            <div className={styles.container}>
                <Title tagElement={'h2'} variant={'banner'} color={'white'}>
                    {'Sewa Mobil di (Lokasimu) Sekarang'}
                </Title>
                <Paragraph variant={'body-1'} color={'white'}>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                </Paragraph>
                <div>
                    <Button type={'button'} onClick={() => navigate('/customer')} variant={'secondary'}>
                        {'Mulai Sewa Mobil'}
                    </Button>
                </div>
            </div>
        </section>
    )
};

export default Banner;
