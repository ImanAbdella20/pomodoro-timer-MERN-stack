import express from 'express';
import { addTask, deleteTask, updateTask } from '../controllers/taskController';

const taskRoute = express.Router();
taskRoute.post('/add' , addTask);
taskRoute.update('/update/:id', updateTask )
taskRoute.delete('/delete/:id', deleteTask )

export default taskRoute;