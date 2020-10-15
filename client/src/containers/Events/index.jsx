import React, { useState, useEffect } from 'react';
import 'grd';
import styles from './index.scss';

import checkAPIRoute from '../../helper.js';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function EventsContainer() {
    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})

    const url = 'events';
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, []);

    const events = response.body || [];
    const renderevents = events.map(function(event, index){
        return (
            <div key={index} className="Cell -3of12">
                <Image
                    link={`/events/${event.id}`}
                    subtitle={event.name}/>
            </div>
        );
    });

    return (
        <div className={styles['container']}>
            <Divider text="Today's Event" />
            <div className="Grid -middle">
                {renderevents}
            </div>
        </div>
    );
}

export default EventsContainer;