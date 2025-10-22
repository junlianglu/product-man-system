import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthIsAuthenticated, selectAuthIsAdmin } from '../../features/auth/authSelectors';
import { fetchCartWithSummaryThunk } from '../../features/cart/cartThunks';
import { selectCartStatus } from '../../features/cart/cartSelectors';

// ProtectedRoute: Requires authentication only
export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const dispatch = useDispatch();
    const cartStatus = useSelector(selectCartStatus);

    useEffect(() => {
        if (isAuthenticated && cartStatus === 'idle') {
            dispatch(fetchCartWithSummaryThunk());
        }
    }, [dispatch, isAuthenticated, cartStatus]);

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