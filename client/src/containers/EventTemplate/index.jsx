import React from 'react';
import styles from './index.scss';

import Heading from '../../component/Heading/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function EventTemplate(props) {
    return (
        <div className='container'>
            <Heading />
            <img src="https://via.placeholder.com/150" />
            <Divider text="Event Result"/>
            <ol className={styles['number-list']}>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
            </ol>
        </div>
    );
}

export default EventTemplate;