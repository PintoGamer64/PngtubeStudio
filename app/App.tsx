import React from 'react'
// Components
import FooBar from './components/FooBar'
import Main from './components/Main'
import Settings from './components/Settings'
import useEventsDefinitios from './events'

function App() {

  useEventsDefinitios().__init__();

  return (
    <>
      <Main />
      <FooBar />
      <Settings />
    </>
  )
}

export default App
