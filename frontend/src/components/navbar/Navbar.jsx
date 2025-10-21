import { Link } from 'react-router-dom';
import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Management</Link>
            <div>
                <UserIcon />
                <CartIcon />
            </div>
        </nav>
    );
};

export default Navbar;