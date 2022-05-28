import React from 'react';
import axios from 'axios';
import { formatRupiah } from '../../utils/helper';
import styles from './card.module.scss';

// Components
import Title from '../title/title';
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';

// Assets
import users from '../../assets/icons/fi_users.svg';
import settings from '../../assets/icons/fi_settings.svg';
import calendar from '../../assets/icons/fi_calendar.svg';

const Card = ({ id, name, category, price, image, step, detail }) => {

    const getDetail = (params) => {
        const fetchDetail = async () => {
            try {
                const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/car/${params}`);
                detail(response);
                step('detail');
            } catch(err) {
                console.log(err);
            };
        };

        fetchDetail();
    };

    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={image} alt={'mobil'} />
            </div>
            <div className={styles.wrapper}>
                <Paragraph variant={'body-1'} color={'black'}>
                    {`${name}/${category}`}
                </Paragraph>
                <Title tagElement={'h2'}>
                    {`${formatRupiah(price)} / hari`}
                </Title>
                <Paragraph variant={'body-1'} color={'black'} weight={'light'}>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                </Paragraph>
            </div>
            <div className={styles['detail-wrapper']}>
                <div className={styles.detail}>
                    <img src={users} alt={'fi_users'} />
                    <Paragraph variant={'body-1'} color={'black'} weight={'light'}>
                        {'4 orang'}
                    </Paragraph>
                </div>
                <div className={styles.detail}>
                    <img src={settings} alt={'fi_settings'} />
                    <Paragraph variant={'body-1'} color={'black'} weight={'light'}>
                        {'Manual'}
                    </Paragraph>
                </div>
                <div className={styles.detail}>
                    <img src={calendar} alt={'fi_calendar'} />
                    <Paragraph variant={'body-1'} color={'black'} weight={'light'}>
                        {'Tahun 2020'}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.button}>
                <Button variant={'secondary'} type={'button'} onClick={() => getDetail(id)} >
                    {'Pilih Mobil'}
                </Button>
            </div>
        </div>
    );
};

export default Card;
