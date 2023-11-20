import FooBar from './components/FooBar'
import Main from './components/Main'
import Topbar from './components/TopBar'

// Types
import { PngtubeStudioAPI } from './types/PngtubeStudioAPI';

function App() {

  //@ts-expect-error Conexion con Electron
  const { Get }: PngtubeStudioAPI = window.PngtubeStudioAPI;

  console.log(Get.Models('getModels'));
  

  return (
    <>
      <Topbar />
      <Main />
      <FooBar />
    </>
  )
}

export default App
