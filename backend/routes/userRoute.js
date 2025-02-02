import express from 'express';
import { login, signUp, updateUserProfile } from '../controllers/authenticationController.js';

const authRoute = express.Router();

authRoute.post('/signup', signUp)
authRoute.post('/login',login)
authRoute.put('/update-profile' , updateUserProfile)

export default authRoute;