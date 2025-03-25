import {Link} from "react-router-dom";
function Navbar(){
    return(
        <nav>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/submit'>Submit</Link>
            </div>
        </nav>
    )
}

export default Navbar