import { useState } from 'react'
import './App.css'
import { Ingredients } from './components/Ingredients'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PlainSpinner } from './components/PlainSpinner';
import { useIngredientContext } from './context/useIngredientContextProvider';


function App() {
  const [count, setCount] = useState(0)
  const { isLoading } = useIngredientContext();
  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/ingredients"
          element={
            <Ingredients/>
          }>

        </Route>
        <Route
          path="*"
          element={
            <div className="d-flex justify-content-center">
              {isLoading && <PlainSpinner />}
              {!isLoading && (
                <h2>Opps, There doesn't seem to be anything at this page</h2>
              )}
            </div>
          }
        ></Route>
      </Routes>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </Router>
    </>
  )
}

export default App
