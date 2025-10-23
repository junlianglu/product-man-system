import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsAuthenticated } from '../../features/auth/authSelectors.js';
import styles from './Navbar.module.css';

const UserIcon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);

    const handleClick = () => {
        if (isAuthenticated) {
            dispatch(logout());
        }
        navigate('/login');
    };

    return (
        <div className={styles.userIconContainer}>
            <span className={styles.userIcon}>👤</span>
            <button onClick={handleClick} className={styles.userIconButton}>
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </button>
        </div>
    );
}

export default UserIcon;