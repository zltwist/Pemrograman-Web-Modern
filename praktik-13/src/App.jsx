import Identity from './components/Identity';
import { useState } from 'react'
import ProductApp from './ProductApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Identity />
<div className="rangga-wrapper">
<>
      <ProductApp />
    </>
  
</div>
</>)
}

export default App

