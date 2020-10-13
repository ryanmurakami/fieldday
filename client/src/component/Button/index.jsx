import React from 'react';
import styles from './index.scss';

function Heading(props) {
    return (
        <div>
            <button className={styles['button']}>CSS Button</button>
        </div>
    );
}

export default Heading;