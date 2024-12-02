import express from 'express';
import { addTask } from '../controllers/taskController';

const taskRoute = express.Router();
taskRoute.post('/add' , addTask);

export default taskRoute;