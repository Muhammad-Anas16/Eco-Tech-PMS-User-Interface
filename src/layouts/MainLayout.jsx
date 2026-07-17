import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
