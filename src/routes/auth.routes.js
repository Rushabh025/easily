import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();

// Register a new recruiter account
router.post('/register', authController.register);

// Render the login page
router.get('/', authController.renderLoginPage);

// Log in as a recruiter
router.post('/login', authController.login);

// Log out the currently logged-in recruiter
router.post('/logout', authController.logout);

export default router;
