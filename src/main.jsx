import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from '../contex/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* Google Login */}
      <GoogleOAuthProvider clientId='788893050303-cmhe5sktvnjman4fn9q06cbentu28f9m.apps.googleusercontent.com'>
       <Contextshare> 

        <App />
        
        </Contextshare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
