import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.scss';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import logo from '../../assets/icons/logo.svg';

const Navbar = () => {
    const [login,setLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('bcrToken') !== null || undefined) setLogin(true);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('bcrToken');
        sessionStorage.removeItem('bcrRole');
        navigate('/login');
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <img src={logo} alt={'logo'} />
                </div>
                <div className={styles.wrapper}>
                    <Link to={'#services'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Our Services'}
                        </Paragraph>
                    </Link>
                    <Link to={'#why-us'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Why Us'}
                        </Paragraph>
                    </Link>
                    <Link to={'#testimonial'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Testimonial'}
                        </Paragraph>
                    </Link>
                    <Link to={'#faq'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'FAQ'}
                        </Paragraph>
                    </Link>
                    <div className={styles.button}>
                        {login ? (
                            <Button variant={'primary'} onClick={() => handleLogout()}>
                                {'Logout'}
                            </Button>
                        ) : (
                            <Button variant={'secondary'} onClick={() => navigate('/register')}>
                                {'Register'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
