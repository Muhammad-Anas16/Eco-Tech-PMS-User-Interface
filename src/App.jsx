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
import FaultPage from "./pages/FaultPage";
import AssetPage from "./pages/AssetPage";
import DashboardPage from "./pages/DashboardPage";
import { Suspense } from "react";
import GeneralPage from "./pages/GeneralPage";
import JobRequestPage from "./pages/JobRequestPage";
import WorkOrdersPage from "./pages/WorkOrdersPage";
import PMSSchedulePage from "./pages/PMSSchedulePage";
import PMSPage from "./pages/PMSPage";
import CalibrationPage from "./pages/CalibrationPage";
import ToolsManagementPage from "./pages/ToolsManagementPage";
import WorkInstructionsPage from "./pages/WorkInstructionsPage";
import TrainingPage from "./pages/TrainingPage";
import DocumentsPage from "./pages/DocumentsPage";
import ReportsPage from "./pages/ReportsPage";
import UserManagementPage from "./pages/UserManagementPage";
import InventoryPage from "./pages/InventoryPage";
import JobRequestListPage from "./pages/jobRequest/JobRequestListPage";
import JobRequestCreatePage from "./pages/jobRequest/JobRequestCreatePage";
// import JobRequestPendingPage from "./pages/jobRequest/JobRequestPendingPage";
// import JobRequestApprovedPage from "./pages/jobRequest/JobRequestApprovedPage";
import JobRequestRejectedPage from "./pages/jobRequest/JobRequestRejectedPage";
// import JobRequestHistoryPage from "./pages/jobRequest/JobRequestHistoryPage";
import JobRequestSearchPage from "./pages/jobRequest/JobRequestSearchPage";
import JobRequestReportsPage from "./pages/jobRequest/JobRequestReportsPage";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
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
          <Route path="/fault" element={<FaultPage />} />
          <Route path="/asset" element={<AssetPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/job-request" element={<JobRequestPage />} />
          <Route path="/jobs" element={<WorkOrdersPage />} />
          <Route path="/pm-schedule" element={<PMSSchedulePage />} />
          <Route path="/pm" element={<PMSPage />} />
          <Route path="/calibration" element={<CalibrationPage />} />
          <Route path="/tools" element={<ToolsManagementPage />} />
          <Route path="/work-instructions" element={<WorkInstructionsPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route
            path="/job-request"
            element={
              // <ProtectedRoute>
                <JobRequestPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/job-request/list"
            element={
              // <ProtectedRoute>
                <JobRequestListPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/job-request/create"
            element={
              // <ProtectedRoute>
                <JobRequestCreatePage />
              // </ProtectedRoute>
            }
          />
          {/* <Route
            path="/job-request/pending"
            element={
              <ProtectedRoute>
                <JobRequestPendingPage />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/job-request/approved"
            element={
              <ProtectedRoute>
                <JobRequestApprovedPage />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/job-request/rejected"
            element={
              // <ProtectedRoute>
                <JobRequestRejectedPage />
              // </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/job-request/history"
            element={
              <ProtectedRoute>
                <JobRequestHistoryPage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/job-request/search"
            element={
              // <ProtectedRoute>
                <JobRequestSearchPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/job-request/reports"
            element={
              // <ProtectedRoute>
                <JobRequestReportsPage />
              // </ProtectedRoute>
            }
          />
          {/* <Route path="/users" element={<UsersPage />} /> */}
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
