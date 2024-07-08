import express from 'express';
const router = express.Router();
import { login, logout, signUp } from '../controllers/authControllers.js';

// Sign up route
router.post('/signup', signUp);

// Sign in route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

export default router;
