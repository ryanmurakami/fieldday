import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import checkAPIRoute from '../../helper.js';

import Heading from '../../component/Heading/index.jsx';
import Divider from '../../component/Divider/index.jsx';

import styles from './index.scss';

function CompetitorTemplate(props) {
    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})
    const { competitor_id } = useParams();

    const url = `competitors/${competitor_id}`;
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, []);

    const competitor = response.body || {};

    return (
        <div className={`container ${styles.wrapper}`}>
            <Heading 
                text={competitor.name}
            />
            <img src={competitor.image} />
            <Divider text="Stats"/>
            <div>
                TODO: create stats component
            </div>
            <Divider text="Participating Event"/>
            <ol className={styles['number-list']}>
                {competitor.events && 
                competitor.events.map(function(result, index){
                    return <li key={index}>
                            {result.name} - {result.rank} - {result.time}
                        </li>;
                })}
            </ol>
        </div>
    );
}

export default CompetitorTemplate;