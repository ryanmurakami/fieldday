import React, { useState, useEffect } from 'react';

function SampleLayout() {
    
    const [response, setResponse] = useState('Oops, something went wrong...')
    useEffect(() =>{
        async function checkAPIRoute() {
            try {
                const host = process.env.REACT_APP_HOST || "http://localhost:5000"
                const response = await fetch(
                    `${host}/api`
                )
                if (response.status === 200) {
                    setResponse("a Success!!!")
                }
            } catch (err) {
                setResponse("Oops, something went wrong...")
            }
        }
        checkAPIRoute()
    }, [response])

    return (
        <h1>{response}</h1>
    );
}

export default SampleLayout;