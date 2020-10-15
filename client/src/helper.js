export default async function checkAPIRoute(endpoint, setResponse) {
    try {
        const host = process.env.REACT_APP_HOST || "http://localhost:5000"
        const response = await fetch(
            `${host}/api/${endpoint}`
        )
        if (response.status === 200) {
            const res = await response.json();
            setResponse(res);
        }
    } catch (err) {
        console.log(err)
        setResponse({"message": "Oops, something went wrong..."})
    }
}