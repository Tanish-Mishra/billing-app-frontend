import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import BillPage from "./pages/BillPage/BillPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={HomePage}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/billing" element={<ProtectedRoute Component={BillPage}/>}/>
    </Routes>
  );
}

export default App;
