import React, { useState, useEffect } from 'react';
import 'grd';
import styles from './index.scss';

import checkAPIRoute from '../../helper.js';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';
import Loader from '../../component/Loader/index.jsx';

function HomeContainer(props) {
    let { event } = props;

    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})

    const url = 'events';
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, [event.current.in_progress]);

    const events = response.body || [];
    const unfininshedEvent = events.filter(event => event.completed == false);
    const renderevents = unfininshedEvent.map(function(event, index){
        return (
            <div key={index} className="Cell -3of12">
                <Image
                    image={event.image}
                    link={`/events/${event.id}`}
                    subtitle={event.name}/>
            </div>
        );
    });

    // Pick a random event from list
    if (!event.current.id && unfininshedEvent.length > 0) {
        let currentEvent = unfininshedEvent[unfininshedEvent.length * Math.random() | 0];
        props.updateFieldDay({
            "id": currentEvent.id,
            "name": currentEvent.name,
            "progress": currentEvent.progress
        });
    }

    return (
        <div className={styles['container']}>
            <div className="Grid -middle">
                <div className="Cell -5of12">
                    <h3 className={styles['title']}>Event Progress</h3>
                    <p className={styles['subtitle']}>{event.current.name}</p>
                    <Loader progress={event.current.progress}/>
                </div>
                <div className={`Cell -2of12 ${styles['relative']}`}>
                    <div className={styles['vl']} />
                </div>
                <div className="Cell -5of12">
                    <h3 className={styles['title']}>Recent Event Winner</h3>
                    <Image
                        link="/"
                        image={event.last.image_url}
                        subtitle={event.last.name}/>
                </div>
            </div>
            <Divider text="Today's Event" />
            <div className="Grid -middle">
                {renderevents}
            </div>
        </div>
    );
}

export default HomeContainer;