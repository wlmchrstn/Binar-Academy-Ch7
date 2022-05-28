import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login-admin.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

// Assets
import logo from '../../assets/icons/logo.svg';

const Error = ({ msg }) => (
    <div className={styles.error}>
        <Paragraph variant={'body-2-light'} color={'red'}>
            {msg}
        </Paragraph>
    </div>
);

const LoginPage = ({ path }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [login, setLogin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLogin(null);
        const token = sessionStorage.getItem('bcrToken');
        const role = sessionStorage.getItem('bcrRole');
        if (token && token !== undefined && token !== 'undefined') return navigate(role === 'admin' ? '/admin' : '/customer');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (data) => {
        const req = {
            email: data.email,
            password: data.password,
        };
        try {
            const { data: response } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/login`, req, {
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            sessionStorage.setItem('bcrToken', response.access_token);
            sessionStorage.setItem('bcrRole', response.role);
            setLogin(true);
            alert('Berhasil Login!');
            navigate(response.role === 'admin' ? '/admin' : '/customer');
        } catch(err) {
            setLogin(false);
        };
    };

    const Login = () => {
        return (
            <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
                <img className={styles.logo} src={logo} alt={'logo'} />
                <Title tagElement={'h1'} variant={'heading-1'} color={'black'}>
                    {'Welcome, Admin BCR'}
                </Title>
                {(errors.email?.type === 'required' || errors.password?.type === 'required' || login === false) && <Error msg={'Invalid Login'} />}
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
        );
    };

    return (
        <section className={styles.root}>
            <div className={styles.image} />
            <Login />
        </section>
    );
};

export default LoginPage;
