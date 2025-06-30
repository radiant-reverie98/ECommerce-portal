
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './assets/Components/userContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  
    <HelmetProvider>
      <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
    
    </BrowserRouter>
    </HelmetProvider>,
  
)
