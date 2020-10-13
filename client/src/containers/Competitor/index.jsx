import React from 'react';
import 'grd';
import styles from './index.scss';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function EventsContainer() {
    return (
        <div className={styles['container']}>
            <Divider text="Competitors" />
            <div className="Grid -middle">
                <div className="Cell -3of12">
                    <Image subtitle="Competitor"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="Competitor"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="Competitor"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="Competitor"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="Competitor"/>
                </div>
            </div>
        </div>
    );
}

export default EventsContainer;