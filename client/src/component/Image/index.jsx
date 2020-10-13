import React from 'react';
import styles from './index.scss';

import { Link } from "react-router-dom";

function Image(props) {
    return (
        <div className={styles['wrapper']}>
            <Link to="/events/1234">
                <img src="https://via.placeholder.com/150" />
                <p className={styles['subtitle']}>{props.subtitle}</p>
            </Link>
        </div>
    );
}

export default Image;