import React from 'react';
import 'grd';
import styles from './index.scss';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';
import Loader from '../../component/Loader/index.jsx';

function HomeContainer() {
    return (
        <div className={styles['container']}>
            <div className="Grid -middle">
                <div className="Cell -5of12">
                    <h3 className={styles['title']}>Event Progress</h3>
                    <p className={styles['subtitle']}>RACE NAME</p>
                    <Loader />
                </div>
                <div className={`Cell -2of12 ${styles['relative']}`}>
                    <div className={styles['vl']} />
                </div>
                <div className="Cell -5of12">
                    <h3 className={styles['title']}>Event Progress</h3>
                    <Image subtitle="RACER NAME"/>
                </div>
            </div>
            <Divider text="Today's Event" />
            <div className="Grid -middle">
                <div className="Cell -3of12">
                    <Image subtitle="EVENT NAME"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="EVENT NAME"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="EVENT NAME"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="EVENT NAME"/>
                </div>
                <div className="Cell -3of12">
                    <Image subtitle="EVENT NAME"/>
                </div>
            </div>
        </div>
    );
}

export default HomeContainer;