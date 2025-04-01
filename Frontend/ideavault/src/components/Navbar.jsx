import {Link} from "react-router-dom";
function Navbar(){
    return (
      <nav className="fixed work-sans flex justify-center top-0 z-50 py-3 w-full mx-auto backdrop-blur-2xl shadow-md ">
        <div className="container mx-auto flex justify-evenly px-6">
          <button className="rounded-full py-1 px-3 hover:bg-gradient-to-r from-blue-600 to-purple-600">
            <Link to="/" className="text-white">
              Home
            </Link>
          </button>
          <button className="rounded-full py-1 px-3 hover:bg-gradient-to-r from-blue-600 to-purple-600">
            <Link to="/register" className="text-white">
              Register
            </Link>
          </button>
          <button className="rounded-full py-1 px-3 hover:bg-gradient-to-r from-blue-600 to-purple-600">
            <Link to="/submit" className="text-white">
              Submit
            </Link>
          </button>
        </div>
      </nav>
    );
};

export default Navbar