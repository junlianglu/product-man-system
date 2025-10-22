import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    selectAuthIsAuthenticated,
    selectAuthStatus, 
    selectAuthError, 
    selectAuthSuccessMessage,
} from '../../features/auth/authSelectors.js';
import { 
    loginThunk, 
    signupThunk, 
    resetPasswordThunk,
} from '../../features/auth/authThunks.js';

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);
    const successMessage = useSelector(selectAuthSuccessMessage);
    const isLoading = status === 'loading';
    const heading = (
        type === 'login' ? 'Sign in to your account'
        : type === 'signup' ? 'Sign up an account'
        : 'Update your password'
    );
    const showPasswordSection = type === 'login' || type === 'signup';
    const showIsAdminSection = type === 'signup';
    const showResetInstruction = type === 'reset';
    const buttonLabel = (
        type === 'login' ? 'Sign In'
        : type === 'signup' ? 'Create account'
        : 'Update password'
    );

    useEffect(() => {
        if (isAuthenticated && (type === 'login' || type === 'signup')) {
            navigate('/');
        }
    }, [type, navigate, isAuthenticated]);

    useEffect(() => {
        if (type === 'reset' && successMessage) {
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [type, successMessage, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;
        setEmailError('');
        setPasswordError('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format!')
            valid = false;
        }
        if (type !== 'reset' && password.length < 6) {
            setPasswordError('Password must be at least 6 characters!')
            valid = false;
        }
        if (!valid) {
            return;
        }

        if (type === 'login') {
            dispatch(loginThunk({ email, password }));
        } else if (type === 'signup') {
            dispatch(signupThunk({ email, password, isAdmin }));
        } else if (type === 'reset') {
            dispatch(resetPasswordThunk({ email }))
        }
    }

    if (type === 'reset' && successMessage) {
        return (
            <div>
                <p>{successMessage}</p>
            </div>
        );
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>{heading}</h1>
            {showResetInstruction && (
                <h2>Enter your email link, we will send you the recovery link</h2>
            )}
            <div>
                <label>Email</label>
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {emailError && <p style={{ color: 'red'}}>{emailError}</p>}
            </div>
            {showPasswordSection && (
                <div>
                    <label>Password</label>
                    <div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <p style={{ color: 'red'}}>{passwordError}</p>}
                </div>
            )}
            {showIsAdminSection && (
                <div>
                    <label>Admin?</label>
                    <input type="checkbox" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)} />
                </div>
            )}
            {error && !emailError && !passwordError && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : buttonLabel}
            </button>
            {type === 'login' && (
                <>
                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    <p><Link to='/reset-password'>Forgot password?</Link></p>
                </>
            )}
            {type === 'signup' && (
                <p>Already have an account <Link to='/login'>Sign in</Link></p>
            )}
        </form>
    );
};

export default AuthForm;