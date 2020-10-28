import React from 'react';
import styles from './index.scss';

function Button(props) {
    const { text, type, action } = props;
    let alertStyle = '';

    if (type === 'alert') {
        alertStyle = styles['button-alert'];
    }

    return (
        <div className={styles.wrapper}>
            <button className={`${styles.button} ${alertStyle}`} onClick={action}>{text}</button>
        </div>
    );
}

export default Button;