import { useState } from 'react'
import './App.css'

import Navbar from '../componentes/navbar';
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      
    </>
  )
}

export default App
