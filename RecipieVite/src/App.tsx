import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IngredientPage } from "./Pages/IngredientPage";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./Pages/HomePage";
import { NoPage } from "./Pages/NoPagePage";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/ingredients" element={<IngredientPage />}/>
          <Route path="*" element={ <NoPage/> }/>
          <Route path="/" element={ <HomePage/> } />
        </Routes>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </Router>
    </>
  );
}

export default App;
