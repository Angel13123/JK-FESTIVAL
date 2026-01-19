import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : ReactDOM.render(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
