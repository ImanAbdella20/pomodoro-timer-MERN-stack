import express from 'express';
import {  getCategories, getCategoryById } from '../controllers/categoryController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';

const categoryRoute = express.Router();

categoryRoute.get('/categories' ,getCategories );
categoryRoute.get('/category/:id' ,getCategoryById );

export default categoryRoute;