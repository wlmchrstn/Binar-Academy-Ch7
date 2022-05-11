import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './paragraph.module.scss';

const Paragraph = ({ children, variant, color, ...props }) => {
    return (
        <p
            className={classNames(
                styles.root,
                styles[variant],
                styles[color],
                props.className
            )}
        >
            {children}
        </p>
    );
};

Paragraph.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
};

Paragraph.defaultProps = {
    children: '',
    variant: 'body-1',
    color: 'black',
};

export default Paragraph;
