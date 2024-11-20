import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/500.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)
