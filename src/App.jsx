import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
        <Route path="/" element={<HomePage />} />

        {/* Future Protected Routes */}
        {/* <Route path="/machines" element={<MachinesPage />} /> */}
        {/* <Route path="/machine-locations" element={<MachineLocationsPage />} /> */}
        {/* <Route path="/operators" element={<OperatorsPage />} /> */}
        {/* <Route path="/technicians" element={<TechniciansPage />} /> */}
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
