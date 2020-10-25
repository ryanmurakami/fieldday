import React, { useState, useEffect } from 'react';
import _, { last } from 'lodash';
import 'grd';
import styles from './index.scss';

import {
    getAPI,
    postAPI
} from '../../helper.js';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';
import Loader from '../../component/Loader/index.jsx';

function HomeContainer(props) {
    const { event, setFieldDay } = props;

    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})

    const url = 'events';
    useEffect(() =>{
        getAPI(url, setResponse)
    }, []);

    const events = _.get(response, 'body.allEvents') || [];
    const unfinishedEvent = events.filter(e => e.completed === false);
    const renderEvents = unfinishedEvent.map(function(event, index){
        return (
            <div key={index} className="Cell -3of12">
                <Image
                    image={event.image}
                    link={`/events/${event.id}`}
                    subtitle={event.name}/>
            </div>
        );
    });

    // Set state on refresh
    // if (!_.get(event, 'current.id') && _.get(response, 'body.inProgress.id')) {
    //     let inProgressEvent = _.get(response, 'body.inProgress');
    //     const lastEvent = _.get(response, 'body.lastEvent');

    //     _updateFieldDay(event, inProgressEvent, lastEvent, setFieldDay);
    // }

    // Pick a random event from list
    if (!_.get(event, 'current.id') && !_.get(response, 'body.inProgress.id') && unfinishedEvent.length > 0) {
        let inProgressEvent = unfinishedEvent[unfinishedEvent.length * Math.random() | 0];
        postAPI(url, inProgressEvent,() => {
            _updateFieldDay(event, inProgressEvent, null, setFieldDay);
        });
    }

    return (
        <div className={styles.container}>
            <div className="Grid -middle">
                <div className="Cell -5of12">
                    <h3 className={styles.title}>Event Progress</h3>
                    <p className={styles.subtitle}>{event.current.name}</p>
                    <Loader progress={event.current.progress}/>
                </div>
                <div className={`Cell -2of12 ${styles.relative}`}>
                    <div className={styles.vl} />
                </div>
                <div className="Cell -5of12">
                    <h3 className={styles.title}>Recent Event Winner</h3>
                    <Image
                        link="/"
                        image={event.last.imageUrl}
                        subtitle={event.last.name}/>
                </div>
            </div>
            <Divider text="Today's Event" />
            <div className="Grid -middle">
                {renderEvents}
            </div>
        </div>
    );
}

function _updateFieldDay(event, inProgressEvent, lastEvent, setFieldDay) {
    if (setFieldDay) {
        const newEvent = {...event};

        if (inProgressEvent) {
            newEvent.current.id = inProgressEvent.id;
            newEvent.current.name = inProgressEvent.name;
            newEvent.current.progress = inProgressEvent.progress;
            newEvent.current.inProgress = inProgressEvent.inProgress;
        }
        
        if (lastEvent) {
            newEvent.last = lastEvent.name;
            newEvent.imageUrl = lastEvent.imageUrl;
        }

        setFieldDay(newEvent);
    }
}

export default HomeContainer;