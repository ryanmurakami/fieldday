export async function getAPI (endpoint, callback) {
  try {
    const host = process.env.REACT_APP_HOST || 'http://localhost:5000'
    const response = await fetch(
      `${host}/api/${endpoint}`
    )
    if (response.status === 200) {
      const res = await response.json()
      callback(res)
    }
  } catch (err) {
    console.log(err)
    callback({ message: 'Oops, something went wrong...' })
  }
}

export async function postAPI (endpoint, data, callback) {
  try {
    const host = process.env.REACT_APP_HOST || 'http://localhost:5000'
    const response = await fetch(
      `${host}/api/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    if (response.status === 200) {
      callback()
    }
  } catch (err) {
    console.log(err)
  }
}
