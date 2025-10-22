import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsAuthenticated, selectAuthIsAdmin } from '../../features/auth/authSelectors';

// ProtectedRoute: Requires authentication only
export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    return <Outlet />;
};

// AdminRoute: Requires authentication AND admin status
export const AdminRoute = () => {
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const isAdmin = useSelector(selectAuthIsAdmin);
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    if (!isAdmin) {
        return <Navigate to='/' replace />;
    }
    return <Outlet />;
};