import React from 'react';
import styles from './our-services.module.scss';

// Assets
import img_service from '../../assets/images/img_service.png';
import bullet_list from '../../assets/icons/bullet_list.svg';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';

const OurServices = () => {
    return (
        <section className={styles.root}>
            <div className={styles.image}>
                <img src={img_service} alt="img_services" />
            </div>
            <div className={styles.content}>
                <Title tagElement={'h3'} variant={'heading-1'} color={'black'}>
                    {'Best Car Rental for any kind of trip in (Lokasimu)!'}
                </Title>
                <Paragraph variant={'body-1'} color={'black'}>
                    {'Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.'}
                </Paragraph>
                <div className={styles.list}>
                    <img src={bullet_list} alt="bullet_list" />
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Sewa Mobil Dengan Supir di Bali 12 Jam'}
                    </Paragraph>
                </div>
                <div className={styles.list}>
                    <img src={bullet_list} alt="bullet_list" />
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Sewa Mobil Lepas Kunci di Bali 24 Jam'}
                    </Paragraph>
                </div>
                <div className={styles.list}>
                    <img src={bullet_list} alt="bullet_list" />
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Sewa Mobil Jangka Panjang Bulanan'}
                    </Paragraph>
                </div>
                <div className={styles.list}>
                    <img src={bullet_list} alt="bullet_list" />
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Gratis Antar - Jemput Mobil di Bandara'}
                    </Paragraph>
                </div>
                <div className={styles.list}>
                    <img src={bullet_list} alt="bullet_list" />
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Layanan Airport Transfer / Drop In Out'}
                    </Paragraph>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
