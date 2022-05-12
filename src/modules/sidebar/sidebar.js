import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './sidebar.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import logo from '../../assets/icons/logo.svg';
import logoSmall from '../../assets/icons/logo-small.svg';
import dashboard from '../../assets/icons/fi_home.svg';
import cars from '../../assets/icons/fi_truck.svg';

const SideBar = ({ handleSideBar, sideBarState, handleContent, contentState, ...props }) => {
    const getContent = () => {
        if (sideBarState === 'Dashboard') {
            return (
                <>
                    <div className={styles['content-header']}>
                        <Paragraph variant={'body-1-bold'} color={'gray-3'}>
                            {'Dashboard'}
                        </Paragraph>
                    </div>
                    <div onClick={() => handleContent('Order')} className={classNames(styles['content-item'], contentState === 'Order' ? styles['content-selected'] : '')}>
                        <Paragraph variant={'body-1-bold'} color={'gray-1'}>
                            {'Order'}
                        </Paragraph>
                    </div>
                    <div onClick={() => handleContent('Car')} className={classNames(styles['content-item'], contentState === 'Car' ? styles['content-selected'] : '')}>
                        <Paragraph variant={'body-1-bold'} color={'gray-1'}>
                            {'Car'}
                        </Paragraph>
                    </div>
                </>
            );
        } else if (sideBarState === 'Cars') {
            return (
                <>
                    <div className={styles['content-header']}>
                        <Paragraph variant={'body-1-bold'} color={'gray-3'}>
                            {'Cars'}
                        </Paragraph>
                    </div>
                    <div className={classNames(styles['content-item'], styles['content-selected'])}>
                        <Paragraph variant={'body-1-bold'} color={'gray-1'}>
                            {'List Car'}
                        </Paragraph>
                    </div>
                </>
            );
        };
    };

    const handleDashboard = () => {
        handleSideBar('Dashboard');
        handleContent('Order');
    };

    const handleCars = () => {
        handleSideBar('Cars');
        handleContent('List Car');
    };

    return (
        <div className={styles.root} {...props}>
            <div className={styles.list}>
                <div className={styles['list-logo']}>
                    <img src={logoSmall} alt={'logo-small'} />
                </div>
                <div onClick={() => handleDashboard()} className={classNames(styles['list-wrapper'], sideBarState === 'Dashboard' ? styles['list-wrapper-selected'] : '')}>
                    <img src={dashboard} alt={'dashboard-logo'} />
                    <Paragraph variant={sideBarState === 'Dashboard' ? 'body-2-bold' : 'body-2-light'} color={'white'}>
                        {'Dashboard'}
                    </Paragraph>
                </div>
                <div onClick={() => handleCars()} className={classNames(styles['list-wrapper'], sideBarState === 'Cars' ? styles['list-wrapper-selected'] : '')}>
                    <img src={cars} alt={'cars-logo'} />
                    <Paragraph variant={sideBarState === 'Cars' ? 'body-2-bold' : 'body-2-light'} color={'white'}>
                        {'Cars'}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles['content-logo']}>
                    <img src={logo} alt={'logo'} />
                </div>
                {getContent()}
            </div>
        </div>
    );
};

SideBar.propTypes = {
    handleSideBar: PropTypes.string.isRequired,
    sideBarState: PropTypes.string.isRequired,
    handleContent: PropTypes.string.isRequired,
    contentState: PropTypes.string.isRequired,
};

SideBar.defaultProps = {
    handleSideBar: 'Dashboard',
    sideBarState: 'Order',
    handleContent: 'Dashboard',
    contentState: 'Order',
};

export default SideBar;
