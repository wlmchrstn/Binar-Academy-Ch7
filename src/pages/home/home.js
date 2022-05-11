import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss';
import logo from '../../assets/icons/logo.svg';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

const Error = () => (
    <div className={styles.error}>
        <Paragraph variant={'body-2-light'} color={'red'}>
            {'Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.'}
        </Paragraph>
    </div>
);

const HomePage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [login, setLogin] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        if (data.email !== 'admin') {
            setLogin(false);
        } else if (data.password !== 'admin') {
            setLogin(false);
        } else {
            navigate('/home');
        };
    };

    return (
        <section className={styles.root}>
            <div className={styles.image} />
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <img className={styles.logo} src={logo} alt={'logo'} />
                <Title tagElement={'h1'} variant={'heading-1'} color={'black'}>
                    {'Welcome, Admin BCR'}
                </Title>
                {(errors.email?.type === 'required' || errors.password?.type === 'required' || login === false) && <Error />}
                <Paragraph variant={'body-1-light'} color={'gray-2'}>
                    {'Email'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        type={'text'}
                        placeholder={'Email'}
                        {...register('email', { required: true })} />
                </Input>
                <Paragraph variant={'body-1-light'} color={'gray-2'}>
                    {'Password'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        type={'password'}
                        placeholder={'Password'}
                        {...register('password', { required: true })} />
                </Input>
                <Button type={'submit'} variant={'primary'}>
                    {'Sign In'}
                </Button>
            </form>
        </section>
    );
};

export default HomePage;
