import React, { useState, useEffect } from 'react';
import styles from './index.scss';

import { useParams } from "react-router-dom";
import checkAPIRoute from '../../helper.js';

import Heading from '../../component/Heading/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function EventTemplate(props) {
    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})
    const { event_id } = useParams();

    const url = `events/${event_id}`;
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, []);

    const event = response.body || {};

    return (
        <div className={`container ${styles['wrapper']}`}>
            <Heading 
                text={event.name}/>
            <img src={event.image} />
            <Divider text="Event Result"/>
            <ol className={styles['number-list']}>
                {event.results && 
                event.results.map(function(result, index){
                    return <li key={ index }>
                            {result.name} - {result.time}
                        </li>;
                })}
            </ol>
        </div>
    );
}

export default EventTemplate;