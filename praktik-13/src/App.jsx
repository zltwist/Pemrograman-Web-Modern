import { useState } from 'react'
import ProductApp from './ProductApp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="portfolio-wrapper">
        <ProductApp />
      </div>
    </>
  )
}

export default App
