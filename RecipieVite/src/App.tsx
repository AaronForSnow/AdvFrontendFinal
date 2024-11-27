import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IngredientPage } from "./Pages/IngredientPage";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./Pages/HomePage";
import { NoPage } from "./Pages/NoPagePage";
import AddIngredient from "./components/AddIngredient";

function App() {
  return (
    <div className="bg-light" style={{ minHeight: '100vh', width: '100%' }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/ingredients" element={<IngredientPage />} />
          <Route path="/addIngredient" element={<AddIngredient/>}/>
          <Route path="*" element={<NoPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
