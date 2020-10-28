import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { getAPI } from '../../helper.js';

import Button from '../../component/Button/index.jsx';
import Heading from '../../component/Heading/index.jsx';

import styles from './index.scss';

function Setting() {
    const [response, setResponse] = useState({ 'status': {} });

    let url = 'status';
    useEffect(() =>{
        getAPI(url, setResponse)
    }, [])

    let runButton = <Button text="Start" action={_startSimulator}/>;

    if (_.get(response, 'status.isRunning')) {
        runButton = <Button text="Stop" type="alert" action={_stopSimulator}/>
    }

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
            {runButton}
            <Button text="Reset" action={_resetSimulator}/>
        </div>
    );
}

function _startSimulator() {
    const url = 'commands/start';
    getAPI(url, (res) => {
        console.log(res);
        // TODO: update state
    });
}

function _stopSimulator() {
    const url = 'commands/stop';
    getAPI(url, (res) => {
        console.log(res);
        // TODO: update state
    });
}

function _resetSimulator() {
    const url = 'commands/reset';
    getAPI(url, (res) => {
        console.log(res);
        // TODO: update state
    });
}

export default Setting;