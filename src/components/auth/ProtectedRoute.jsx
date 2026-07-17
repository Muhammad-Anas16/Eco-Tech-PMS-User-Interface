// import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LoginRequiredPage from "../../pages/LoginRequiredPage";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginRequiredPage />;
  }

  return children;
};

export default ProtectedRoute;
