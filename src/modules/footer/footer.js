import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

// Components
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import facebook from '../../assets/icons/icon_facebook.svg';
import instagram from '../../assets/icons/icon_instagram.svg';
import twitter from '../../assets/icons/icon_twitter.svg';
import mail from '../../assets/icons/icon_mail.svg';
import twitch from '../../assets/icons/icon_twitch.svg';
import logo from '../../assets/icons/logo.svg';

const Footer = () => {
    return (
        <footer className={styles.root}>
            <div className={styles.address}>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000'}
                </Paragraph>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'binarcarrental@gmail.com'}
                </Paragraph>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'081-233-334-808'}
                </Paragraph>
            </div>
            <div className={styles.navigation}>
                <div className={styles.link}>
                    <Link to={'/services'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Our services'}
                        </Paragraph>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link to={'/why-us'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Why Us'}
                        </Paragraph>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link to={'/testimonial'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Testimonial'}
                        </Paragraph>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link to={'/faq'}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'FAQ'}
                        </Paragraph>
                    </Link>
                </div>
            </div>
            <div className={styles.social}>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'Connect with us'}
                </Paragraph>
                <div className={styles['social-group']}>
                    <a href={'https://www.facebook.com/binaracademy'} target={'blank_'} rel={'noopener noreferrer'}>
                        <img src={facebook} alt={'icon_facebook'} />
                    </a>
                    <a href={'https://www.instagram.com/academybinar/'} target={'blank_'} rel={'noopener noreferrer'}>
                        <img src={instagram} alt={'icon_instagram'} />
                    </a>
                    <a href={'https://twitter.com/academybinar'} target={'blank_'} rel={'noopener noreferrer'}>
                        <img src={twitter} alt={'icon_twitter'} />
                    </a>
                    <a href={'mailto:info@binar.co.id'} target={'blank_'} rel={'noopener noreferrer'}>
                        <img src={mail} alt={'icon_mail'} />
                    </a>
                    <a href={'https://www.twitch.tv/'} target={'blank_'} rel={'noopener noreferrer'}>
                        <img src={twitch} alt={'icon_twitch'} />
                    </a>
                </div>
            </div>
            <div className={styles.copyright}>
                <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                    {'Copyright Binar 2022'}
                </Paragraph>
                <img src={logo} alt={'logo'} />
            </div>
        </footer>
    );
};

export default Footer;
