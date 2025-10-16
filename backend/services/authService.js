import jwt from 'jsonwebtoken';
import { Cart } from '../models/Cart.js';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';

const generateToken = user => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const validateEmail = email => {
    if (!email || typeof email !== 'string') {
        throw new Error('email is required and must be a string');
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!(/.+@.+\..+/).test(normalizedEmail)) {
        throw new Error('invalid email format');
    }
    return normalizedEmail;
};

const validatePassword = password => {
    if (!password || typeof password !== 'string') {
        throw new Error('password is required and must be a string');
    }
    if (password.length < 6) {
        throw new Error('password must be at least length 6');
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const normalizedEmail = validateEmail(email);
        validatePassword(password);
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            throw new Error('email does not exist');
        }
        if (!await comparePassword({ password, hashedPassword: user.password })) {
            throw new Error('incorrect password');
        }
        const token = generateToken(user);
        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

export const signupUser = async ({ email, password, isAdmin }) => {
    try {
        const normalizedEmail = validateEmail(email);
        validatePassword(password);
        if (await User.findOne({ email: normalizedEmail })) {
            throw new Error('email has been taken');
        }
        const user = await User.create({
            email: normalizedEmail, 
            password: await hashPassword(password), 
            isAdmin
        });
        const cart = await Cart.create({ user: user._id });
        user.cart = cart._id;
        await user.save();
        const token = generateToken(user);
        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

export const sendResetLink = async ({ email }) => {
    try {
        const normalizedEmail = validateEmail(email);
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
            // send recovery link to email
        }
    } catch (err) {
        throw new Error(err.message);
    }
};