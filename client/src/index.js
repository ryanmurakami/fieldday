import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.jsx'

const wrapper = document.getElementById('container')
wrapper ? ReactDOM.render(<App />, wrapper) : false
