import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MachinePage from "./pages/MachinePage";
import MachineLocationPage from "./pages/MachineLocationPage";
import AuthorityPage from "./pages/AuthorityPage";
import OperatorPage from "./pages/OperatorPage";
import TechnicianPage from "./pages/TechnicianPage";

function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* AuthorityPage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/machine" element={<MachinePage />} />
        <Route path="/machine-location" element={<MachineLocationPage />} />
        <Route path="/authority" element={<AuthorityPage />} />
        <Route path="/operator" element={<OperatorPage />} />
        <Route path="/technician" element={<TechnicianPage />} />
        {/* <Route path="/faults" element={<FaultsPage />} /> */}
        {/* <Route path="/inventory" element={<InventoryPage />} /> */}
        {/* <Route path="/users" element={<UsersPage />} /> */}
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
