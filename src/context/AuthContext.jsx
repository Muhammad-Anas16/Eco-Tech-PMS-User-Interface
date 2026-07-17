import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Logged-in user ka actual data (fullName, role, employeeId, id)
  const [user, setUser] = useState(null);

  // App pehli baar load hote waqt "/me" call abhi chal rahi hai ya khatam ho gayi —
  // isse hum login-check complete hone tak koi UI/redirect decision nahi lete
  const [loading, setLoading] = useState(true);

  // Simple true/false flag — poore app me ye check karne ke liye ke
  // user login hai ya nahi (Sidebar, ProtectedRoute waghera isko use karenge)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ===========================
  // Check Current Logged User
  // ===========================
  const checkCurrentUser = async () => {
    // Token hi nahi hai to seedha "not logged in" maan lo —
    // bekar me failed API call (401) nahi maarni
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return null;
    }

    try {
      // getMe() poora backend response deta hai: { success, message, data }
      const response = await getMe();
      // Yahan sirf "data" part hi asli user object hai — isi ko state me daalna hai
      const currentUser = response?.data ?? null;

      setUser(currentUser);
      setIsAuthenticated(true);

      return currentUser;
    } catch (error) {
      // Token expire ho chuka ho ya invalid ho (401) — yahan aayega
      console.log(
        "Not Logged In:",
        error?.response?.data?.message || error.message,
      );

      // Purana/kharab token localStorage se hata do, warna baar baar
      // isi expired token ke sath request jaati rahegi
      localStorage.removeItem("token");

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } finally {
      // Chahe success ho ya fail — check khatam ho gaya, ab app render kar sakta hai
      setLoading(false);
    }
  };

  // Login ke turant baad, ya kahin bhi user data dobara fetch karna ho
  // (jaise profile update ke baad) to yehi call karo
  const refreshUser = () => checkCurrentUser();

  // Logout par local state turant clear karne ke liye
  // (localStorage se token hatana already logout() function me ho raha hai)
  const clearUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // App load hote hi ek dafa check karo — token hai to /me call karke
  // confirm karo ke wo abhi bhi valid hai
  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,

        setUser,
        clearUser,

        refreshUser,
        checkCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook — komponents me "const { user, isAuthenticated } = useAuth()" se use hoga
export const useAuth = () => useContext(AuthContext);
