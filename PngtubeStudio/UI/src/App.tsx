// Components
import FooBar from './components/FooBar'
import Main from './components/Main'
import useEventFullScreen from './events/Fullscreen'

function App() {

  useEventFullScreen()

  return (
    <>
      <Main />
      <FooBar />
    </>
  )
}

export default App
