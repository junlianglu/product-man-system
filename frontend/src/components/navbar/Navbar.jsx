import { Link } from 'react-router-dom';
import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to='/' className={styles.navbarTitle}>Management</Link>
            <div className={styles.navbarIcons}>
                <UserIcon />
                <CartIcon />
            </div>
        </nav>
    );
};

export default Navbar;