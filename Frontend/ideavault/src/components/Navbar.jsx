import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed work-sans top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-[#1f2124]">Publications</h1>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              ☰ List
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-[#1f2124] text-white rounded-md">
              ⊞ Board
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              ⋮⋮ Workflow
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              location.pathname === "/"
                ? "bg-[#fa8029] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Home
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              location.pathname === "/register"
                ? "bg-[#fa8029] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Register
          </Link>
          <Link
            to="/submit"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              location.pathname === "/submit"
                ? "bg-[#fa8029] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Submit
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
