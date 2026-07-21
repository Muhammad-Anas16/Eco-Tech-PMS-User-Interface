import "./App.css";
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
// general
import MachinePage from "./pages/general/MachinePage";
import MachineLocationPage from "./pages/general/MachineLocationPage";
import AssetPage from "./pages/general/AssetPage";
import InventoryPage from "./pages/general/InventoryPage";
import FaultPage from "./pages/general/FaultPage";
import OperatorPage from "./pages/general/OperatorPage";
import TechnicianPage from "./pages/general/TechnicianPage";
import AuthorityPage from "./pages/general/AuthorityPage";

//
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
import JobRequestListPage from "./pages/jobRequest/JobRequestListPage";
import JobRequestCreatePage from "./pages/jobRequest/JobRequestCreatePage";
import JobRequestPendingPage from "./pages/jobRequest/JobRequestPendingPage";
import JobRequestApprovedPage from "./pages/jobRequest/JobRequestApprovedPage";
import JobRequestRejectedPage from "./pages/jobRequest/JobRequestRejectedPage";
import JobRequestHistoryPage from "./pages/jobRequest/JobRequestHistoryPage";
import JobRequestSearchPage from "./pages/jobRequest/JobRequestSearchPage";
import JobRequestReportsPage from "./pages/jobRequest/JobRequestReportsPage";
import GeneralLayout from "./layouts/GeneralLayout";
import MachineDetailPage from "./pages/general/details/MachineDetailPage";
import MachineLocationDetailPage from "./pages/general/details/MachineLocationDetailPage";
import AssetDetailPage from "./pages/general/details/AssetDetailPage";
import InventoryDetailPage from "./pages/general/details/InventoryDetailPage";
import FaultDetailPage from "./pages/general/details/FaultDetailPage";
import OperatorDetailPage from "./pages/general/details/OperatorDetailPage";
import TechnicianDetailPage from "./pages/general/details/TechnicianDetailPage";
import AuthorityDetailPage from "./pages/general/details/AuthorityDetailPage";

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
          {/* Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/job-request" element={<JobRequestPage />} />
          {/* General Page */}
          <Route path="/general" element={<GeneralPage />} />

          <Route path="/general" element={<GeneralLayout />}>
            <Route path="machine" element={<MachinePage />} />
            <Route path="machine/:id" element={<MachineDetailPage />} />
            <Route path="machine-location" element={<MachineLocationPage />} />
            <Route
              path="machine-location/:id"
              element={<MachineLocationDetailPage />}
            />
            <Route path="asset" element={<AssetPage />} />
            <Route path="asset/:id" element={<AssetDetailPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/:id" element={<InventoryDetailPage />} />

            <Route path="fault" element={<FaultPage />} />
            <Route path="fault/:id" element={<FaultDetailPage />} />

            <Route path="operator" element={<OperatorPage />} />
            <Route path="operator/:id" element={<OperatorDetailPage />} />

            <Route path="technician" element={<TechnicianPage />} />
            <Route path="technician/:id" element={<TechnicianDetailPage />} />

            <Route path="authority" element={<AuthorityPage />} />
            <Route path="authority/:id" element={<AuthorityDetailPage />} />
          </Route>
          {/* Job Reqest */}
          <Route path="/job-request/list" element={<JobRequestListPage />} />
          <Route
            path="/job-request/create"
            element={<JobRequestCreatePage />}
          />
          <Route
            path="/job-request/pending"
            element={<JobRequestPendingPage />}
          />
          <Route
            path="/job-request/approved"
            element={<JobRequestApprovedPage />}
          />
          <Route
            path="/job-request/rejected"
            element={<JobRequestRejectedPage />}
          />
          <Route
            path="/job-request/history"
            element={<JobRequestHistoryPage />}
          />
          <Route
            path="/job-request/search"
            element={<JobRequestSearchPage />}
          />
          <Route
            path="/job-request/reports"
            element={<JobRequestReportsPage />}
          />
          {/*  */}
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
