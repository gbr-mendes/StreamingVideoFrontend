import { useState } from 'react'
import './App.css'
import VideoCatalog from './components/VideoCatalog'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VideoCatalog/>
    </>
  )
}

export default App
