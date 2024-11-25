import express from 'express';
import { signUp } from '../controllers/authenticationController.js';

const authRoute = express.Router();

authRoute.post('/signup', signUp)
authRoute.post('/login',)

export default authRoute;