import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import GoogleButton from 'react-google-button';
import styles from './home.module.scss';

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

const HomePage = ({ path }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [login, setLogin] = useState(null);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        setLogin(null);
        const token = sessionStorage.getItem('bcrToken');
        const role = sessionStorage.getItem('bcrRole');
        if (token && token !== undefined && token !== 'undefined') return navigate(role === 'admin' ? '/admin' : '/customer');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoggle = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            console.log(res);
            sessionStorage.setItem('bcrToken', res.user.accessToken);
            sessionStorage.setItem('bcrRole', 'customer');
            console.log(res.user.accessToken);
            setLogin(true);
            alert('Berhasil Login!');
            navigate('/customer');
        } catch(err) {
            console.log(err);
        };
    };

    const handleRegister = async (data) => {
        const req = {
            email: data.email,
            password: data.password,
            role: 'admin',
        };
        try {
            const { data: response } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/register`, req, {
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            const loginReq = {
                email: response.email,
                password: data.password,
            };
            const { data: login } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/login`, loginReq, {
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            console.log(login);
            sessionStorage.setItem('bcrToken', login.access_token);
            sessionStorage.setItem('bcrRole', login.role);
            setLogin(true);
            alert('Registered!');
            navigate(login.role === 'admin' ? '/admin' : '/customer');
        } catch(err) {
            setLogin(false);
        };
    };

    const Register = () => {
        return (
            <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
                <img className={styles.logo} src={logo} alt={'logo'} />
                <Title tagElement={'h1'} variant={'heading-1'} color={'black'}>
                    {'Create new Account'}
                </Title>
                {(errors.email?.type === 'required' || errors.password?.type === 'required' || login === false) && <Error msg={'Invalid Register'} />}
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
                    {'Sign Up'}
                </Button>
                <div style={{ marginTop: '16px'}}>
                    <Paragraph variant={'body-1-light'} color={'gray-2'}>
                        {'Already have an account? '}
                        <Link to={'/login'}>{'Login'}</Link>
                    </Paragraph>
                </div>
            </form>
        );
    };

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
                <div style={{ marginTop: '16px' }}>
                    <GoogleButton onClick={handleGoggle} />
                </div>
                <div style={{ marginTop: '16px'}}>
                    <Paragraph variant={'body-1-light'} color={'gray-2'}>
                        {"Don't have an account yet? "}
                        <Link to={'/'}>{'Register now'}</Link>
                    </Paragraph>
                </div>
            </form>
        );
    };

    return (
        <section className={styles.root}>
            <div className={styles.image} />
            {path === 'register' ? <Register /> : <Login />}
        </section>
    );
};

export default HomePage;
