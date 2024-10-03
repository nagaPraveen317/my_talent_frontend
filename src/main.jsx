import React from 'react'
import ReactDOM from 'react-dom/client'
import { LoginProvider } from './LoginContext.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>,
)
