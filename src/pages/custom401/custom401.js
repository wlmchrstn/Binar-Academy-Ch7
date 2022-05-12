import React from 'react';
import { Link } from 'react-router-dom';
import styles from './custom401.module.scss';

const Custom401 = () => {
    return (
        <div className={styles.root}>
            <h1>
                {'Error 401 | Forbidden'}
            </h1>
            <Link to={'/login'}>
                {'Back to home'}
            </Link>
        </div>
    );
};

export default Custom401;
