import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import logo from '../../assets/icons/logo.svg';

const Navbar = () => {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <img src={logo} alt={'logo'} />
                </div>
                <div className={styles.wrapper}>
                    <Link to={'/services'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Our Services'}
                        </Paragraph>
                    </Link>
                    <Link to={'/why-us'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Why Us'}
                        </Paragraph>
                    </Link>
                    <Link to={'/testimonial'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Testimonial'}
                        </Paragraph>
                    </Link>
                    <Link to={'/faq'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'FAQ'}
                        </Paragraph>
                    </Link>
                    <div className={styles.button}>
                        <Button variant={'secondary'} type={'submit'}>{'Register'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
