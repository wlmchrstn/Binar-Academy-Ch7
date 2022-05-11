import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.module.scss';

const Input = ({ children, dropdown, ...props }) => (
    <div className={styles.root} {...props}>
        <div className={classNames(styles.input, dropdown ? styles.dropdown : '')} >
            {children}
        </div>
    </div>
);

Input.propTypes = {
    children: PropTypes.node.isRequired,
    dropdown: PropTypes.bool,
};

Input.defaultProps = {
    children: <input />,
    dropdown: false,
};

export default Input;
