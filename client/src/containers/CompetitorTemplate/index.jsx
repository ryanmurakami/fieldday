import React from 'react';
import styles from './index.scss';

import Heading from '../../component/Heading/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function CompetitorTemplate(props) {
    return (
        <div className='container'>
            <Heading />
            <img src="https://via.placeholder.com/150" />
            <Divider text="Stats"/>
            <div>
                TODO: create stats component
            </div>
            <Divider text="Participating Event"/>
            <ol className={styles['number-list']}>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li>
            </ol>
        </div>
    );
}

export default CompetitorTemplate;