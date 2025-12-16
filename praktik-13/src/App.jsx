import { useState } from 'react'
import ProductApp from './ProductApp'
import Identity from './components/Identity'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Identity />
      <div className="portfolio-wrapper">
        <ProductApp />
      </div>
    </>
  )
}

export default App
