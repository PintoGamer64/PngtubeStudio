import FooBar from './components/FooBar'
import Main from './components/Main'
import Topbar from './components/TopBar'
import AvatarsProvider from './contexts/Avatars/provider'
import SettingsProvider from './contexts/Settings/provider'

function App() {

  return (
    <SettingsProvider>
      <AvatarsProvider>
        <Topbar />
        <Main />
        <FooBar />
      </AvatarsProvider>
    </SettingsProvider>
  )
}

export default App
