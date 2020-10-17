import React from 'react';
import styles from './index.scss';

import { Link } from "react-router-dom";

function Image(props) {
    return (
        <div className={styles['wrapper']}>
            <Link to={props.link}>
                <img src={props.image} />
                <p className={styles['subtitle']}>{props.subtitle}</p>
            </Link>
        </div>
    );
}

export default Image;