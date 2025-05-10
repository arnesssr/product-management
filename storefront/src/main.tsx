import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
