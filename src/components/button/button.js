import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './button.module.scss';

const Button = ({ children, variant, type, withIcon, withIconLabel, ...props }) => (
    <button className={classNames(styles.root, styles[variant])} type={type} {...props}>
        {withIcon && <img src={withIcon} alt={withIconLabel} />}
        {children}
    </button>
);


Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    type: PropTypes.string,
    withIcon: PropTypes.string,
    withIconLabel: PropTypes.string,
};

Button.defaultProps = {
    children: '',
    variant: 'primary',
    type: 'button',
    withIcon: null,
    withIconLabel: null,
};

export default Button;
