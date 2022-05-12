import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './cars.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Message from '../../components/message/message';

// Assets
import chevronRight from '../../assets/icons/fi_chevron-right.svg';
import plus from '../../assets/icons/fi_plus.svg';
import trash from '../../assets/icons/fi_trash.svg';
import edit from '../../assets/icons/fi_edit.svg';
import key from '../../assets/icons/fi_key.svg';
import clock from '../../assets/icons/fi_clock.svg';

const Cars = ({ sideBarState, data }) => {
    const [audit,setAudit] = useState(false);
    const [filter,setFilter] = useState('All');
    const [message,setMessage] = useState('null');
    const [msg,setMsg] = useState(null);
    const [showMessage,setShowMessage] = useState(false);

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timeId)
        }
    }, [showMessage]);

    const FilterCTA = ({ state }) => (
        <div onClick={() => setFilter(state)} className={classNames(styles['filter-wrapper'], filter === state ? styles['filter-selected'] : '')}>
            {state}
        </div>
    );

    const getMobil = (params) => {
        if (filter === 'All') return params.map((item, index) => (<Card key={index} data={item} />));

        let filtered = params.filter((e) => { return e.filter === filter });
        return filtered.map((item, index) => (<Card key={index} data={item} />));
    };

    const handleDelete = () => {
        setMessage('deleted');
        setMsg('Data Berhasil Dihapus');
        setShowMessage(true);
    };

    const handleAudit = () => {
        setMessage('success');
        setMsg('Data Berhasil Disimpan');
        setShowMessage(true);
        setAudit(false);
    };

    const Card = ({ data }) => {
        return (
            <div className={styles['card-wrapper']}>
                <div className={styles['card-image']}>
                    <img src={data.src} alt={data.label} />
                </div>
                <div className={styles['card-label']}>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {`${data.label}/${data.type}`}
                    </Paragraph>
                </div>
                <div className={styles['card-price']}>
                    <Title tagElement={'h3'} variant={'title'} color={'black'}>
                        {`Rp ${data.price} / hari`}
                    </Title>
                </div>
                <div className={styles['card-rent']}>
                    <img src={key} alt={'logo-key'} />
                    <Paragraph variant={'body-1-light'}>
                        {`${data.startRent} - ${data.finishRent}`}
                    </Paragraph>
                </div>
                <div className={styles['card-update']}>
                    <img src={clock} alt={'logo-clock'} />
                    <Paragraph variant={'body-1-light'}>
                        {`Updated at ${data.update}`}
                    </Paragraph>
                </div>
                <div className={styles['card-cta']}>
                    <Button onClick={() => handleDelete()} type={'button'} variant={'secondary-outlined'} color={'red'} withIcon={trash} withIconLabel={'logo-trash'}>
                        {'Delete'}
                    </Button>
                    <Button onClick={() => setAudit(true)} type={'button'}  variant={'secondary'} color={'white'} withIcon={edit} withIconLabel={'logo-edit'}>
                        {'Edit'}
                    </Button>
                </div>
            </div>
        );
    };

    const Audit = () => {
        return (
            <div className={styles.audit}>
                <div className={styles['audit-form']}>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Nama'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'text'}
                                placeholder={1} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Harga'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'text'}
                                placeholder={1} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Foto'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'file'}
                                placeholder={1} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Start Rent'}
                            </Paragraph>
                        </div>
                        <div className={styles['audit-input']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'-'}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Finish Rent'}
                            </Paragraph>
                        </div>
                        <div className={styles['audit-input']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'-'}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Created at'}
                            </Paragraph>
                        </div>
                        <div className={styles['audit-input']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'-'}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Updated at'}
                            </Paragraph>
                        </div>
                        <div className={styles['audit-input']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'-'}
                            </Paragraph>
                        </div>
                    </div>
                </div>
                <div className={styles['audit-cta']}>
                    <Button onClick={() => setAudit(false)} type={'button'} variant={'primary-outlined'}>
                        {'Cancel'}
                    </Button>
                    <Button onClick={() => handleAudit()} type={'button'} variant={'primary'}>
                        {'Save'}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.root}>
            {showMessage ? (
                    <Message variant={message}>
                        {msg}
                    </Message>
                ) : null
            }
            <div className={styles.navigation}>
                <Paragraph variant={'body-2-bold'} color={'black'}>
                    {sideBarState}
                </Paragraph>
                <div className={styles['navigation-chevron']}>
                    <img src={chevronRight} alt={'logo-chevron-right'} />
                </div>
                {audit ? (
                    <>
                        <Paragraph variant={'body-2-bold'} color={'black'}>
                            {'List Car'}
                        </Paragraph>
                        <div className={styles['navigation-chevron']}>
                            <img src={chevronRight} alt={'logo-chevron-right'} />
                        </div>
                        <Paragraph variant={'body-2-light'} color={'black'}>
                            {'Add New Car'}
                        </Paragraph>
                    </>
                ) : (
                    <Paragraph variant={'body-2-light'} color={'black'}>
                        {'List Car'}
                    </Paragraph>
                )}
            </div>
            <div className={styles.header}>
                {audit ? (
                    <Title tagElement={'h2'} variant={'heading-2'} color={'black'}>
                        {'Add New Car'}
                    </Title>
                ) : (
                    <>
                        <Title tagElement={'h2'} variant={'heading-2'} color={'black'}>
                            {'List Car'}
                        </Title>
                        <Button onClick={() => setAudit(true)} variant={'primary'} color={'white'} withIcon={plus} withIconLabel={'logo-plus'}>
                            {'Add New Car'}
                        </Button>
                    </>
                )}
            </div>
            {audit ? null : (
                <div className={styles.filter}>
                    <FilterCTA state={'All'} />
                    <FilterCTA state={'Small'} />
                    <FilterCTA state={'Medium'} />
                    <FilterCTA state={'Large'} />
                </div>
            )}
            {audit ? (
                <Audit />
            ) : (
                <div className={styles.card}>
                    {getMobil(data)}
                </div>
            )}
        </div>
    );
};

Cars.propTypes = {
    sideBarState: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Cars.defaultProps = {
    sideBarState: 'Cars',
    data: [],
};

export default Cars;
