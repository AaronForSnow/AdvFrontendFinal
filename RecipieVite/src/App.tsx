import { useState } from 'react'
import './App.css'
import { Ingredients } from './Pages/Ingredients'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Ingredients/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
