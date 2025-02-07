import express from 'express';
import multer from 'multer';
import { deleteAccount, login, signUp, updateUserProfile } from '../controllers/authenticationController.js';


const authRoute = express.Router();

// Multer Configuration
const storage = multer.memoryStorage(); // You can use diskStorage if you want to store files on the server
const upload = multer({ storage });


authRoute.post('/signup', signUp)
authRoute.post('/login',login)
authRoute.put('/update-profile'  ,upload.single('profileImage'),  updateUserProfile)
authRoute.delete('/deleteaccount', deleteAccount)

export default authRoute;