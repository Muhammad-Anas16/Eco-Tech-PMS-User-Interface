import { Link } from "react-router";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginRequiredPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <LockKeyhole className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold">Login Required</h1>

        <p className="mt-3 text-slate-500">
          You must login first to access this page.
        </p>

        <div className="mt-8 flex gap-3">
          <Button asChild className="flex-1">
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild variant="outline" className="flex-1">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredPage;
