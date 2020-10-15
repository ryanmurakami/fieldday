import React, { useState, useEffect } from 'react';
import checkAPIRoute from '../helper.js';
import { useParams } from "react-router-dom";

function events() {
    const [response, setResponse] = useState('Oops, something went wrong...')
    const events_id = useParams();
    
    let url = 'events';
    if (events_id) {
        url += `/${events_id}`;
    }
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, [response])

    return (
        <h1>{response}</h1>
    );
}

export default events;