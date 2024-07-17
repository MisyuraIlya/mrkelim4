import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'
import 'react-calendar/dist/Calendar.css'
require('../global.js')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
