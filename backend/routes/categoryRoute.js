import express from 'express';
import {  getCategories, getCategoryById } from '../controllers/categoryController.js';
import { validateToken } from '../middleware/authMiddleware.js';

const categoryRoute = express.Router();

categoryRoute.get('/categories' ,validateToken,getCategories );
categoryRoute.get('/category/:id' ,validateToken,getCategoryById );

export default categoryRoute;