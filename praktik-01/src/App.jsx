import Identity from './components/Identity';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Identity />
<div className="rangga-wrapper">
<>
      <h1>Halo Vite dan React</h1>
    </>
  
</div>
</>)
}

export default App

