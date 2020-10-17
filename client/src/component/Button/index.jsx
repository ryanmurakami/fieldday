import React from 'react';
import styles from './index.scss';

function Heading(props) {
    return (
        <div className={styles['wrapper']}>
            <button className={styles['button']}>CSS Button</button>
        </div>
    );
}

export default Heading;