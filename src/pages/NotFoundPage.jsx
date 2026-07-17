import { Link } from "react-router";
import { Home, TriangleAlert } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-xl rounded-3xl border bg-white p-10 text-center shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <TriangleAlert size={50} className="text-red-600" />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold text-slate-800">404</h1>

        <h2 className="mt-3 text-2xl font-semibold text-slate-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <Home className="mr-2 h-5 w-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
