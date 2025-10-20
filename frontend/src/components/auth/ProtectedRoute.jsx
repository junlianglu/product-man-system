import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsAuthenticated, selectAuthIsAdmin } from '../../features/auth/authSelectors';

export default ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const isAdmin = useSelector(selectAuthIsAdmin);
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    if (!isAdmin) {
        return <Navigate to='/home' replace />;
    }
    return <Outlet />;
};