import React from 'react';
import styles from './index.scss';

function Heading(props) {
    return (
        <div>
            <h1 className={styles.heading}>{props.text}</h1>
        </div>
    );
}

export default Heading;