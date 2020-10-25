import React from 'react';
import styles from './index.scss';

import Button from '../../component/Button/index.jsx';
import Heading from '../../component/Heading/index.jsx';

function Setting(props) {
    return (
        <div className={`container ${styles.wrapper}`}>
            <Heading text="AWS Connection Status"/>

            <div className={styles.p}>
                <dl className={styles.dl}>
                    <dt className={styles.dt}>ICON</dt>
                    <dd className={styles.dd}>DynamoDB Connection</dd>
                    <dt className={styles.dt}>ICON</dt>
                    <dd className={styles.dd}>ElastiCache Connection</dd>
                    <dt className={styles.dt}>ICON</dt>
                    <dd className={styles.dd}>Outside Internet Connection</dd>
                </dl> 
            </div>

            <Heading text="Field Day App Controls"/>
            <Button />
            <Button />
        </div>
    );
}

export default Setting;