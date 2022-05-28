import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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

const Cars = ({ sideBarState, data, handleRefresh, refresh }) => {
    const [audit, setAudit] = useState(false);
    const [id, setId] = useState(null);
    const [filter, setFilter] = useState('All');
    const [message, setMessage] = useState('null');
    const [msg, setMsg] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const {
        register,
        reset,
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: '',
            category: '',
            price: '',
            status: null,
            image: null,
        }
    });

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowMessage(false);
        }, 3000);

        return () => {
            clearTimeout(timeId)
        }
    }, [showMessage]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: '',
                category: '',
                price: '',
                status: null,
                image: null,
            });
        }
    }, [isSubmitSuccessful, reset]);

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

    const handleDelete = async (e, params) => {
        e.preventDefault();
        try {
            const { data: response } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/car/${params}`, {
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            console.log(response, 'API Response');
            setMessage('deleted');
            setMsg('Data Berhasil Dihapus');
            setShowMessage(true);
        } catch(err) {

        };
        handleRefresh(!refresh);
    };

    const handleUpdate = (params) => {
        setAudit(true);
        setId(params);
    };

    const handleCancel = () => {
        setAudit(false);
        setId(null);
    };

    const handleAudit = async (data) => {
        const { name, category, price, status, image } = data;
        const req = new FormData();
        req.append('name', name);
        req.append('category', category);
        req.append('price', price);
        req.append('status', status);
        if (image.length > 0) req.append('image', image[0]);

        try {
            if (id) {
                const { data: response } = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/car/${id}`, req, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                });
                console.log(response, 'API response');
                setId(null);
            } else {
                const { data: response } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/car`, req, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                });
                console.log(response, 'API response');
            }
            setMessage('success');
            setMsg('Data Berhasil Disimpan');
            setShowMessage(true);
            setAudit(false);
        } catch (err) {
            console.log(err, 'handleAudit Error')
        };
    };

    const Card = ({ data }) => {
        return (
            <div className={styles['card-wrapper']}>
                <div className={styles['card-image']}>
                    <img src={data.image} alt={data.name} />
                </div>
                <div className={styles['card-label']}>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {`${data.name}/${data.category}`}
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
                        {`${data.start_rent_at} - ${data.finish_rent_at}`}
                    </Paragraph>
                </div>
                <div className={styles['card-update']}>
                    <img src={clock} alt={'logo-clock'} />
                    <Paragraph variant={'body-1-light'}>
                        {`Updated at ${data.updatedAt}`}
                    </Paragraph>
                </div>
                <div className={styles['card-cta']}>
                    <Button onClick={(e) => handleDelete(e, data.id)} type={'button'} variant={'secondary-outlined'} color={'red'} withIcon={trash} withIconLabel={'logo-trash'}>
                        {'Delete'}
                    </Button>
                    <Button onClick={() => handleUpdate(data.id)} type={'button'} variant={'secondary'} color={'white'} withIcon={edit} withIconLabel={'logo-edit'}>
                        {'Edit'}
                    </Button>
                </div>
            </div>
        );
    };

    const Audit = () => {
        return (
            <form className={styles.audit} onSubmit={handleSubmit(handleAudit)}>
                <div className={styles['audit-form']}>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Name'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'text'}
                                {...register('name', { required: true })} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Category'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'text'}
                                {...register('category', { required: true })} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Price'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'number'}
                                {...register('price', { required: true })} />
                        </Input>
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Status'}
                            </Paragraph>
                        </div>
                        <input
                            type={'checkbox'}
                            {...register('status')} />
                    </div>
                    <div className={styles['audit-wrapper']}>
                        <div className={styles['audit-label']}>
                            <Paragraph variant={'body-2-light'} color={'black'}>
                                {'Image'}
                            </Paragraph>
                        </div>
                        <Input className={styles['audit-input']}>
                            <input
                                type={'file'}
                                {...register('image')} />
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
                    <Button onClick={() => handleCancel()} type={'button'} variant={'primary-outlined'}>
                        {'Cancel'}
                    </Button>
                    <Button type={'submit'} variant={'primary'}>
                        {'Save'}
                    </Button>
                </div>
            </form>
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
