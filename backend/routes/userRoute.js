import express from 'express';
import { login, signUp } from '../controllers/authenticationController.js';
import { validateToken } from '../middleware/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/signup',validateToken, signUp)
authRoute.post('/login',validateToken,login)

export default authRoute;