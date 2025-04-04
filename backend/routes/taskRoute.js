import express from 'express';
import { addTask, deleteTask, getTasksByCategory, updateTask } from '../controllers/taskController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';

const taskRoute = express.Router();
taskRoute.post('/add' , validateFirebaseToken, addTask);
taskRoute.put('/update/:id',validateFirebaseToken, updateTask );
taskRoute.delete('/delete/:id',validateFirebaseToken, deleteTask);
taskRoute.get('/',validateFirebaseToken, getTasksByCategory )

export default taskRoute;