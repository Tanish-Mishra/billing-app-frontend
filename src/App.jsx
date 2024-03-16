import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
