import { useState } from 'react'
import './index.css'
import Nav from './component/Nav'
import Manager from './component/Manager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <Manager/>
    </>
  )
}

export default App
