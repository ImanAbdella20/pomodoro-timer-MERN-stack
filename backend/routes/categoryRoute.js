import express from 'express';
import {  getCategories, getCategoryById } from '../controllers/categoryController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';

const categoryRoute = express.Router();

categoryRoute.get('/categories' ,validateFirebaseToken,getCategories );
categoryRoute.get('/category/:id' ,validateFirebaseToken,getCategoryById );

export default categoryRoute;