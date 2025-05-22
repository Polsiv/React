import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './components/Context/ThemeContext.jsx';
import InstallButton from './components/Button/InstallButton.jsx';

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <InstallButton />
    </ThemeProvider>
  </StrictMode>,
)
