import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StudyProvider } from './context/StudyContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StudyProvider>
        <App />
      </StudyProvider>
    </BrowserRouter>
  </StrictMode>,
)
