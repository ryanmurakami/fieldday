import React, { useState, useEffect } from 'react';
import 'grd';
import _ from 'lodash';
import styles from './index.scss';

import { getAPI } from '../../helper.js';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function EventsContainer() {
    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})

    const url = 'events';
    useEffect(() =>{
        getAPI(url, setResponse)
    }, []);

    const events = _.get(response, 'body.allEvents') || [];
    const renderevents = events.map(function(event, index){
        return (
            <div key={index} className="Cell -3of12">
                <Image
                    image={event.image}
                    link={`/events/${event.id}`}
                    subtitle={event.name}/>
            </div>
        );
    });

    return (
        <div className={styles.container}>
            <Divider text="Today's Event" />
            <div className="Grid -middle">
                {renderevents}
            </div>
        </div>
    );
}

export default EventsContainer;