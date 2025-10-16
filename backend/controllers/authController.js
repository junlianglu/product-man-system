import { loginUser, signupUser, sendResetLink } from '../services/authService.js';

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser({ email, password });
        res.status(200).json({ token, user });
    } catch (err) {
        if (err.message === 'email is required and must be a string'
            || err.message === 'invalid email format'
            || err.message === 'password is required and must be a string'
            || err.message === 'password must be at least length 6'
        ) {
            res.status(400).json({ error: err.message });
        } else if (err.message === 'incorrect password') {
            res.status(401).json({ error: err.message });
        } else if (err.message === 'email does not exist') {
            res.status(404).json({ error: err.message });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

export const signupUserController = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;
        const { token, user } = await signupUser({ email, password, isAdmin });
        res.status(201).json({ token, user });
    } catch (err) {
        if (err.message === 'email is required and must be a string'
            || err.message === 'invalid email format') 
        {
            res.status(400).json({ error: err.message });
        } else if (err.message === 'email has been taken') {
            res.status(409).json({ error: err.message });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

export const sendResetLinkController = async (req, res) => {
    try {
        const { email } = req.body;
        await sendResetLink({ email });
        res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent. '});
    } catch (err) {
        if (err.message === 'email is required and must be a string'
            || err.message === 'invalid email format'
        ) {
            res.status(400).json({ error: err.message });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};