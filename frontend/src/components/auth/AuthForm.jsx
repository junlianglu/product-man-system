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
import { clearMessages } from '../../features/auth/authSlice.js';
import styles from './AuthForm.module.css';

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
        dispatch(clearMessages());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && (type === 'login' || type === 'signup')) {
            navigate('/');
        }
    }, [type, navigate, isAuthenticated]);

    useEffect(() => {
        if (type === 'reset' && successMessage) {
            setTimeout(() => navigate('/login'), 5000);
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
            <div className={styles.resetSuccess}>
                <h2>Password Reset Email Sent</h2>
                <p>{successMessage}</p>
                <p>Redirecting to login page...</p>
            </div>
        );
    }
    

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.authContainer}>
            <h1 className={styles.heading}>{heading}</h1>
            {showResetInstruction && (
                <h2 className={styles.resetInstruction}>Enter your email address, we will send you the recovery link</h2>
            )}
            <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                    <input 
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {emailError && <p className={styles.errorText}>{emailError}</p>}
            </div>
            {showPasswordSection && (
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                        className={styles.input}
                        type={showPassword ? 'text' : 'password'}
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <button type="button" className={styles.showPasswordBtn} onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <p className={styles.errorText}>{passwordError}</p>}
                </div>
            )}
            {showIsAdminSection && (
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Admin?</label>
                    <input className={styles.checkbox} type="checkbox" value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                </div>
            )}
            {error && !emailError && !passwordError && <p className={styles.errorText}>{error}</p>}
            <button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? <span className={styles.loadingText}>Submitting...</span> : <span className={styles.buttonText}>{buttonLabel}</span>}
            </button>
            {type === 'login' && (
                <div className={styles.linkGroup}>
                    <p className={styles.link}>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    <p className={styles.link}><Link to='/reset-password'>Forgot password?</Link></p>
                </div>
            )}
            {type === 'signup' && (
                <div className={styles.linkGroup}>
                    <p className={styles.link}>Already have an account? <Link to='/login'>Sign in</Link></p>
                </div>
            )}
        </form>
    );
};

export default AuthForm;