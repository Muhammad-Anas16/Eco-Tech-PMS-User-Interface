import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginRequiredPage from "@/pages/LoginRequiredPage";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  useEffect(() => {
    if (loading) return;

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    const refreshed = sessionStorage.getItem("page-refreshed");
    if (isAuthenticated && !refreshed) {
      sessionStorage.setItem("page-refreshed", "true");
      window.location.reload();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p>Checking Authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    sessionStorage.removeItem("page-refreshed");
    return <LoginRequiredPage />;
  }

  return children;
};

export default ProtectedRoute;
