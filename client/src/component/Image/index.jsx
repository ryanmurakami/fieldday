import React from 'react';
import styles from './index.scss';

function Image(props) {
    return (
        <div className={styles['wrapper']}>
            <img src="https://via.placeholder.com/150" />
            <p className={styles['subtitle']}>{props.subtitle}</p>
        </div>
    );
}

export default Image;