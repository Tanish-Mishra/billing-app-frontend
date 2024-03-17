import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={HomePage}/>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
