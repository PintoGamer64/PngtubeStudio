import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SettingsProvider from './contexts/Settings/provider.tsx'
import AvatarsProvider from './contexts/Avatars/provider.tsx'
import AudioProvider from './contexts/Audio/provider.tsx'
import MemoryProvider from './contexts/Memory/Provider.tsx'
import Topbar from './components/TopBar.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('PngtubeStudio')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AvatarsProvider>
        <AudioProvider>
          <MemoryProvider>
            <Topbar />
            <div id="root">
              <App />
            </div>
          </MemoryProvider>
        </AudioProvider>
      </AvatarsProvider>
    </SettingsProvider>
  </React.StrictMode>
)
