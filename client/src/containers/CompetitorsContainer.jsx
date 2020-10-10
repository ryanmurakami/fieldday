import React, { useState, useEffect } from 'react';
import checkAPIRoute from '../helper.js';
import { useParams } from "react-router-dom";

function competitors() {
    const [response, setResponse] = useState('Oops, something went wrong...')
    const competitor_id = useParams();
    
    let url = 'competitors';
    if (competitor_id) {
        url += `/${competitor_id}`;
    }
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, [response])

    return (
        <h1>{response}</h1>
    );
}

export default competitors;