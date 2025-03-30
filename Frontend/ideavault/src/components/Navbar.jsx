import {Link} from "react-router-dom";
function Navbar(){
    return (
      <nav className="playfair-display sticky flex justify-center top-0 z-50 py-3 w-full mx-auto bg-blue-600 shadow-md ">
        <div className="container mx-auto flex justify-evenly px-6">
          <button className="rounded-lg py-1 px-3 bg-blue-600 hover:bg-blue-700">
            <Link to="/" className="text-white">
              Home
            </Link>
          </button>
          <button className="rounded-lg py-1 px-3 bg-blue-600 hover:bg-blue-700">
            <Link to="/register" className="text-white">
              Register
            </Link>
          </button>
          <button className="rounded-lg py-1 px-3 bg-blue-600 hover:bg-blue-700">
            <Link to="/submit" className="text-white">
              Submit
            </Link>
          </button>
        </div>
      </nav>
    );
};

export default Navbar