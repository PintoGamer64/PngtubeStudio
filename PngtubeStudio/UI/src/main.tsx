import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SettingsProvider from './contexts/Settings/provider.tsx'
import AvatarsProvider from './contexts/Avatars/provider.tsx'
import AudioProvider from './contexts/Audio/provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AvatarsProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AvatarsProvider>
    </SettingsProvider>
  </React.StrictMode>
)
