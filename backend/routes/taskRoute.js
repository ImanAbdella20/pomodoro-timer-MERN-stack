import express from 'express';
import { addTask, deleteTask, updateTask } from '../controllers/taskController';

const taskRoute = express.Router();
taskRoute.post('/add' , addTask);
taskRoute.put('/update/:id', updateTask );
taskRoute.delete('/delete/:id', deleteTask);
taskRoute.get('/', )

export default taskRoute;