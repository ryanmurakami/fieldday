import React from 'react';
import { Link } from "react-router-dom";

import styles from './index.scss';

function Image(props) {
    return (
        <div className={styles.wrapper}>
            <Link to={props.link}>
                <img src={props.image} />
                <p className={styles.subtitle}>{props.subtitle}</p>
            </Link>
        </div>
    );
}

export default Image;