import Eco_Tech_Logo from "../assets/eco-tech-logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Bell, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/UserDropdown";
import { logout } from "@/api/auth.api";
import { showToast } from "@/lib/toast";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [time, setTime] = useState("");
  const { user, isAuthenticated, clearUser } = useAuth();

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const pageName =
    pathname === "/"
      ? "Home"
      : pathname
          .split("/")
          .filter(Boolean)
          .map(
            (item) =>
              item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, " "),
          )
          .join(" / ");

  const handleLogout = async () => {
    try {
      await logout();

      clearUser();

      showToast.success("Logged out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      showToast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      {/* Top Header */}

      <div className="flex h-16 items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <Link to="/" className="flex items-center gap-3">
            <img
              src={Eco_Tech_Logo}
              alt="Logo"
              className="h-11 w-11 rounded-xl"
            />

            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Eco Technologies
              </h1>

              <p className="text-sm text-slate-500">Maintenance Management</p>
            </div>
          </Link>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={18} />
          </Button>

          {isAuthenticated && (
            <UserDropdown
              user={{
                name: user?.fullName || "User",

                role: user?.role || "Employee",

                initials:
                  user?.fullName
                    ?.split(" ")
                    .map((item) => item[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "U",
              }}
              onProfile={() => navigate("/profile")}
              onSettings={() => navigate("/settings")}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>

      {/* Bottom Header */}

      <div className="flex flex-wrap items-center justify-between border-t bg-slate-50 px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Home size={16} />

          <Link to="/" className="hover:text-emerald-600">
            Home
          </Link>

          {pathname !== "/" && (
            <>
              <ChevronRight size={16} />

              <span className="font-medium text-slate-800">{pageName}</span>
            </>
          )}
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">{today}</p>

          <p className="text-xs text-slate-500">{time}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
